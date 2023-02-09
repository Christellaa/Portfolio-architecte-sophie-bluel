const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let email = document.getElementById("email");
let password = document.getElementById("password");

//validations
email.addEventListener("input", (event) => {
    
    if(!emailRegex.test(email.value)) {
        email.setCustomValidity("Veuillez mettre un email valide.");
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