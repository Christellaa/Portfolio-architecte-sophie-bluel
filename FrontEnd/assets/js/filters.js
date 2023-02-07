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
const addCategories = (categories) => {
    categories.forEach((categories) => {
        const filtersContainer = document.getElementById("filtersContainer");
        
        const filters = document.createElement("li");
        filtersContainer.appendChild(filters);

        filters.innerText = categories.name;
        filters.id = categories.id;
        filters.classList.add("filters");

        const filterAll = document.createElement("li")
        filterAll.setAttribute("id", 0);
        filterAll.setAttribute("name","Tous");
        filterAll.classList.add("filters");
        filtersContainer.appendChild(filterAll);
        console.log(filterAll);

        //const filtersContainerArray = [filtersContainer.childNodes];
        const filtersContainerArray = [];
        for (node = document.getElementById('filtersContainer').firstChild;
        node;
        node = node.nextSibling) {
            if (node.nodeType == 1 && node.tagName == 'LI') {
                filtersContainerArray.push(node.innerHTML);
            }
        }
        console.log(filtersContainerArray);

        filterActive(filters, filtersContainerArray);
    })
}

function filterActive(element, container) {
    //ajouter class au nouveau filtre actif
    element.addEventListener("click", () => {
        //container.forEach(element) 
        console.log("a");
        for (let i = 0; i < container.length; i++) 
        {
            console.log("b");
            
            document.querySelector(".filters .filterActive").classList.remove("filterActive");
            element.classList.add("filterActive");
            console.log("c");
            //document.querySelector(".filterActive").classList.remove("filterActive");
        }
    });
}


getWorksArray();
getAllCategories();

async function showCategories() {
    const allCategories = await getAllCategories();
    addCategories(allCategories);
}
showCategories();