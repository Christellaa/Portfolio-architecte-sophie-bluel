/*works = fetch("http://localhost:5678/api/works")
.then(works => works.json());
*/

function getAllWorks(){
    fetch ("http://localhost:5678/api/works")
        .then(function(res) {
            if (res.ok) {
                console.log("bojn");
                return res.json();
            }
        })
        .then(function(value) {
            addWork(value);
            console.log(value);
        })
        .catch(function(err) {
        // Une erreur est survenue
        });
}

function addWork(works) {
    works.forEach(function(){
    const gallery = document.getElementsByClassName("gallery");
    console.log("g");
    //création balises
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const caption = document.createElement("figcaption");
    //lie balises
    img.src = works.imageUrl;
    img.setAttribute("alt", works.title);
    caption.innerText = works.title;
    //ajout à page web
    //gallery.appendChild(figure);
    console.log("gallery doesn't work");
    figure.appendChild(img, caption);
    });
}

getAllWorks();