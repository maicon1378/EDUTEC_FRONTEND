export async function verifytoken(url) {
    const token = localStorage.getItem("token")

    if(!token) {
        window.location.href = url
        return
    }

    // verificar se o token é valido
    const response = await fetch("https://edutecbackend2.vercel.app/verify", {
        headers: {
            "Authorization": token
        }
    }).then(response => response.json())

    if(!response.ok) {
        alert(response.message)
        window.location.href = url
    }
}