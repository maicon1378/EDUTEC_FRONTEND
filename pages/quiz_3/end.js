const finalScore = document.getElementById('finalScore');
const scoreForm = document.getElementById('scoreForm');
const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');

const mostRecentScore = localStorage.getItem('mostRecentScore');

finalScore.innerText = mostRecentScore;

// Desabilita o botão de salvar se não houver um nome de usuário
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

// Função para obter o nome do usuário do backend
async function getUsername() {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para salvar sua pontuação.');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/getname', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        username.value = data.name;
        username.disabled = true;
        saveScoreBtn.disabled = false;
    } catch (error) {
        console.error('Erro ao obter o nome do usuário:', error);
        alert('Erro ao obter o nome do usuário. Por favor, faça login novamente.');
    }
}

// Chama a função para obter o nome do usuário quando a página carrega
getUsername();

scoreForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
        alert('Você precisa estar logado para salvar sua pontuação.');
        return;
    }

    try {
        const quizId = 3; // Substitua pelo ID correto do quiz atual
        const requestBody = { 
            correctAnswers: parseInt(mostRecentScore) / 10,
            quizId: quizId
        };
        console.log('Enviando requisição:', requestBody);

        const response = await fetch('http://localhost:3000/update-xp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Resposta do servidor:', errorText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        alert('Pontuação salva com sucesso!');
        window.location.href = '../ranking/ranking.html'; 
    } catch (error) {
        console.error('Erro ao salvar a pontuação:', error);
        alert('Erro ao salvar a pontuação. Tente novamente mais tarde.');
    }
});

// Função para voltar à página inicial
function voltarParaInicio() {
    window.location.href = '../../index.html';
}

// Adiciona um botão para voltar à página inicial
const voltarButton = document.createElement('button');
voltarButton.textContent = 'Voltar para o Início';
voltarButton.addEventListener('click', voltarParaInicio);
document.body.appendChild(voltarButton);