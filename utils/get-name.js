export async function getName() {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token não disponível');
    }

    const response = await fetch('https://edutecbackend.vercel.app/getname', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw new Error('Falha ao obter nome do usuário');
    }

    const data = await response.json();
    return data.name;
}