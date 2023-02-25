const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
let email = document.getElementById("email");
let password = document.getElementById("password");

//validate Email and Password
function validateForm(email, password) {
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

//function sending the form to the API
async function sendForm(email, password) {
    try {
        const res = await fetch("http://localhost:5678/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"email": email, "password": password})
        })
        //get token
        if (res.ok) {
            const userToken = await res.json();
            sessionStorage.setItem("token", userToken.token);
            window.location.href = "index.html";
            console.log(userToken);
        }
    } catch (err) {
    console.error(err);
  };
}

//send form to the API by clicking on the button
const button = document.getElementById("sendForm");
button.addEventListener("click", (event) => {
    event.preventDefault();
    if((email.value == "") || (password.value == "")) {
        alert("Adresse email ou mot de passe invalide");
    } else {
        sendForm(email.value, password.value);
    }
})