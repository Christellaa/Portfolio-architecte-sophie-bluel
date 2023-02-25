const tokenToDelete = sessionStorage.getItem("token");

let logOut = document.getElementById("login-logout");

if(tokenToDelete !== "" && tokenToDelete !== null) {
    logOut.innerHTML = "Logout";
