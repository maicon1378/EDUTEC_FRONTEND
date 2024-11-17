async function register() {
    const name = document.querySelector("#name").value
    const email = document.querySelector("#email").value
    const password = document.querySelector("#password").value
    const passwordConfirmation = document.querySelector("#password-confirmation").value

    if(name === "" || email === "" || password === "" || passwordConfirmation === "") {
        alert("Preencha todas as informações!")
        return
    }

    if(password !== passwordConfirmation) {
        alert("As senhas não conferem. Digite as senhas novamente!")
        document.querySelector("#password").value = ""
        document.querySelector("#password-confirmation").value = ""
        return
    }

    const user = {
        name,
        email,
        password
    }
    
    const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({  user })
    }).then(response => response.json())
    
    alert(response.massage)

    if(response.userExists) {
        window.location.reload()
        return
    }

    window.location.href = "../login/login.html"
}


const button = document.querySelector("form button")
button.addEventListener("click", (event) => {
    event.preventDefault()
    register()
})