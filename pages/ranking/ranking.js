document.addEventListener('DOMContentLoaded', startRankingUpdates);

function showLoading() {
    const rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = '<tr><td colspan="3">Carregando ranking...</td></tr>';
}

function hideLoading() {
    const rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = '';
}

function showError(message) {
    const rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = `<tr><td colspan="3">${message}</td></tr>`;
}

async function fetchRanking() {
    showLoading();
    try {
        console.log("Buscando dados do ranking...");
        const response = await fetch('https://edutecbackend.vercel.app/ranking');
        const data = await response.json();

        console.log("Dados do ranking recebidos:", data);

        if (response.ok) {
            hideLoading();
            displayRanking(data);
        } else {
            console.error('Erro ao obter o ranking:', data.message);
            showError('Erro ao carregar o ranking. Por favor, tente novamente mais tarde.');
        }
    } catch (error) {
        console.error('Erro:', error);
        showError('Erro ao carregar o ranking. Por favor, tente novamente mais tarde.');
    }
}

function formatXP(xp) {
    return xp.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function displayRanking(rankingData) {
    console.log("Exibindo ranking:", rankingData);
    const rankingBody = document.getElementById('rankingBody');
    rankingBody.innerHTML = ''; // Limpa o conteúdo atual

    if (rankingData.length === 0) {
        rankingBody.innerHTML = '<tr><td colspan="3">Nenhum dado de ranking disponível.</td></tr>';
        return;
    }

    rankingData.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${player.username}</td>
            <td>${formatXP(player.xp)}</td>
        `;
        rankingBody.appendChild(row);
    });
}

function mudarPagina() {
    window.location.href = '/index.html';
}

function startRankingUpdates() {
    fetchRanking(); // Carrega o ranking imediatamente
    setInterval(fetchRanking, 60000); // Atualiza a cada minuto
}