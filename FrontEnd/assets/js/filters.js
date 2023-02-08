async function getWorksArray() {
    const works = await getAllWorks();
}

async function getAllCategories() {
    try {
        const res = await fetch("http://localhost:5678/api/categories");
        if (res.ok) {
            const categories = await res.json();
            return categories;
        }
    } catch (err) {
        console.error(err);
    };
}

//création des catégories
function addCategories(categories) {
    const filtersContainer = document.getElementById("filtersContainer");

    const filterAll = document.createElement("li");
    filterAll.setAttribute("id", 0);
    filterAll.innerHTML = "Tous";
    filterAll.classList.add("filters", "filterActive");
    filtersContainer.appendChild(filterAll);

    categories.forEach(function(category) {
        const filters = document.createElement("li");

        filters.innerText = category.name;
        filters.id = category.id;
        filters.classList.add("filters");

        filtersContainer.appendChild(filters);

        filterActive(filters);
    });
    filterActive(filterAll);
}

//filtre actif
function filterActive(element) {
    element.addEventListener("click", () => {
        let remover = document.getElementsByClassName("filterActive");
        if (remover.length !== 0) {
            Array.from(remover).forEach((element) => {
            element.classList.remove("filterActive");
            });
        }
        element.classList.add("filterActive");
        showWorks(element.id);
    });
}

async function showCategories() {
    const allCategories = await getAllCategories();
    addCategories(allCategories);
}

getWorksArray();
getAllCategories();
showCategories();