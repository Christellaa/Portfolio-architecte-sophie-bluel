let currentModal = null;

//prevent closing modal by clicking inside of it
const stopPropagation = function (e) {
    e.stopPropagation();
}

//open modalGallery
const openModal = function (e) {
    e.preventDefault();
    currentModal = document.querySelector("#modal");
    currentModal.style.display = "flex";
    currentModal.classList.add("flexCenter");
    document.querySelector(".modalGallery").style.display = "block";
    document.querySelector(".modalAddWork").style.display = "none";
    currentModal.removeAttribute("aria-hidden");
    currentModal.setAttribute("aria-modal", "true");
    currentModal.addEventListener("click", closeModal);
    currentModal.querySelector(".fa-xmark").addEventListener("click", closeModal);
    currentModal.querySelector(".modalGallery").addEventListener("click", stopPropagation);
}

const openModalButton = document.querySelector("#openModalButton");
openModalButton.addEventListener("click", openModal);

//open modalAddWork
const addPicture = function (e) {
    e.preventDefault();
    let modalGallery = document.querySelector(".modalGallery");
    let modalAddWork = document.querySelector(".modalAddWork");
    modalGallery.style.display = "none";
    modalAddWork.style.display = "block";
    modalAddWork.querySelector(".fa-xmark").addEventListener("click", closeModal);
    modalAddWork.addEventListener("click", stopPropagation);
}

const addWorkButton = document.querySelector("#addWorkButton");
addWorkButton.addEventListener("click", addPicture);

//go back to modalGallery
const goBackToModalGallery = function (e) {
    e.preventDefault();
    document.querySelector(".modalGallery").style.display = "block";
    document.querySelector(".modalAddWork").style.display = "none";
}

const backToModalGallery = document.querySelector(".fa-arrow-left");
backToModalGallery.addEventListener("click", goBackToModalGallery);

//close modal
const closeModal = function (e) {
    e.preventDefault();
    currentModal.style.display = "none";
    currentModal.setAttribute("aria-hidden", "true");
    currentModal.removeAttribute("aria-modal");
    currentModal.removeEventListener("click", closeModal);
    currentModal.querySelector(".fa-xmark").removeEventListener("click", closeModal);
    currentModal.querySelector(".modalGallery").removeEventListener("click", stopPropagation);
    currentModal.querySelector(".modalAddWork").removeEventListener("click", stopPropagation);
    currentModal = null;
}

//close modal by escape button
window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    }
})