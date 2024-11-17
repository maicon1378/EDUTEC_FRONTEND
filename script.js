import { verifytoken } from "./utils/verify-token.js";
import { getName } from "./utils/get-name.js";
import { logout } from "./utils/logout.js";

const url = "./pages/login/login.html";

async function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            await verifytoken(url);
            const name = await getName();
            document.querySelector('.user p').textContent = `Usuário: ${name}`;
            document.querySelector('.user').style.display = 'flex';
            document.querySelector('#inscreva-se-btn').style.display = 'none';
        } catch (error) {
            console.error('Erro ao verificar status de login:', error);
        }
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('#inscreva-se-btn').style.display = 'block';
    }
}

checkLoginStatus();
logout();