let currentModal = null;

//prevent closing modal by clicking inside of it
const stopPropagation = function (e) {
    e.stopPropagation();
}

const openModal = function (e) {
    e.preventDefault();
    currentModal = document.querySelector(e.target.getAttribute("href"));
    currentModal.style.display = "flex";
    currentModal.classList.add("flexCenter");
    currentModal.removeAttribute("aria-hidden");
    currentModal.setAttribute("aria-modal", "true");
    currentModal.addEventListener("click", closeModal);
    currentModal.querySelector(".fa-xmark").addEventListener("click", closeModal);
    currentModal.querySelector(".modal").addEventListener("click", stopPropagation);
}

const closeModal = function (e) {
    e.preventDefault();
    currentModal.style.display = "none";
    currentModal.setAttribute("aria-hidden", "true");
    currentModal.removeAttribute("aria-modal");
    currentModal.removeEventListener("click", closeModal);
    currentModal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
    currentModal.querySelector(".modal").removeEventListener("click", stopPropagation);
    currentModal = null;
}

document.querySelectorAll(".modifyLink").forEach(a => {
    a.addEventListener("click", openModal);
})

//close modal by escape button
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})