let currentModal = null;
const token = sessionStorage.getItem("token");
if(token !== "" && token !== null) {
    let openModalButton = document.getElementById("openModalButton");
    openModalButton.style.display = "block";
}

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

//get all works from the API
async function getWorksArray() {
    const works = await getAllWorks();
    addWorksToModal(works);
}

//add all works to the DOM
const addWorksToModal = (works) => {
    works.forEach(function(work) {
    const gallery = document.getElementById("galleryContainer");
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const trashContainer = document.createElement("div");
    const trash = document.createElement("i");
    const caption = document.createElement("figcaption");

    figure.id = work.id;
    img.src = work.imageUrl;
    trashContainer.classList.add("trashContainer", "cursorPointer");
    trash.classList.add("fa-regular", "fa-trash-can");
    caption.innerText = "éditer";
  
    img.setAttribute("alt", work.title);
    
    figure.appendChild(img);
    figure.appendChild(trashContainer);
    trashContainer.appendChild(trash);
    figure.appendChild(caption);
    gallery.appendChild(figure);

    trash.addEventListener("click", (e) => {
        e.preventDefault();
        deleteWork(work.id);
    })
    });
}

//delete a work by clicking on the trash icon
async function deleteWork (workId) {
    try {
        const res = await fetch("http://localhost:5678/api/works/" + workId, {
            method: "DELETE",
            headers: {
                "accept": "*/*",
                "Authorization": `Bearer ${token}`
            },
        })
        if (res.ok) {
            document.getElementById(workId).remove();
            document.getElementById("project-work-" + workId).remove();
        }
    }
    catch (err) {
        console.error(err);
    };
};

//create form variables
const inputContainer = document.getElementById("inputContainer");
let imgButton = document.getElementById("addImgButton");
let imgContainer = document.getElementById("imgContainer");
const titleContainer = document.getElementById("infoTitle");
let workTitle = document.getElementById("titleImg");
let imgErrorMessage = document.createElement("span");
let titleErrorMessage = document.createElement("span");

imgErrorMessage.classList.add("imgErrorMessage");
titleErrorMessage.classList.add("titleErrorMessage");

imgContainer.appendChild(imgErrorMessage);
titleContainer.appendChild(titleErrorMessage);

//validate img of new work
imgButton.addEventListener("change", (e) => {
    let imgFile = document.createElement("img");
    
    imgFile.setAttribute("id", "imgPreview");

    imgContainer.appendChild(imgFile);

    let [file] = imgButton.files;

    if (file) {
        imgPreview.src = URL.createObjectURL(file);
        inputContainer.style.display = "none";
        imgFile.classList.add("cursorPointer");

        imgFile.addEventListener("click", (e) => {
            imgFile.remove();
            imgButton.click();
        })

        let fileSize = file.size;
        //1MB = 1024, 4MB = 4096 * 1024
        const maxFileSize = 4096 * 1024;
        console.log("max", maxFileSize, "actual", fileSize);
        
        if (fileSize > maxFileSize) {
            imgFile.remove();
            inputContainer.style.display = "inline-block";
            imgErrorMessage.innerText = "La taille de l'image est trop grande";
        }
        else {
            imgErrorMessage.innerText = "";
        }
    }
    else if (imgFile.src === "") {
        imgFile.remove();
        inputContainer.style.display = "inline-block";
    }
});

//validate title of new work
workTitle.addEventListener("input", (e) => {
    if (workTitle.value === "") {
        titleErrorMessage.innerText = "Veuillez mettre un titre valide.";
        workTitle.classList.add("inputError");
    }
    else {
        titleErrorMessage.innerText = "";
        workTitle.classList.remove("inputError");
    }
});

//get all categories from the API
async function getCategoriesArray() {
    const categories = await getAllCategories();
    addCategoriesToModal(categories);
}

getWorksArray();