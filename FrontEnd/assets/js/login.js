const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let email = document.getElementById("email");
let password = document.getElementById("password");

//validate Email and Password
function validateForm() {
    email.addEventListener("input", (event) => {
        if(!emailRegex.test(email.value)) {
            email.setCustomValidity("Veuillez mettre une adresse email valide.");
            return false;
        } else {
            email.setCustomValidity("");
        }
    });
    
    password.addEventListener("input", (event) => {
        
        if(password.value.length < 5) {
            password.setCustomValidity("Le mot de passe doit contenir au minimum 5 caractères");
            return false;
        }
        else {
            password.setCustomValidity("");
        }
    });
}

//send form to the API
async function sendForm() {
    await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        //body: validateForm()
        body: JSON.stringify({"email":"sophie.bluel@test.tld", "password":"S0phie"})
    })
    /*.then((token) => token.json())
    .then((LoggedIn) => {
        document.location.href = "http://127.0.0.1:5500/FrontEnd/index.html";
    })*/
}

sendForm();