async function getAllWorks() {
    try {
      const res = await fetch("http://localhost:5678/api/works");
      if (res.ok) {
        const works = await res.json();
        return works;
      }
    } catch (err) {
      console.error(err);
    }
}

function addWorksToDocument(works) {
  works.forEach(function(work) {
      addWork(work);
  });
}

function addWork(work) {
  const gallery = document.getElementById("gallery");
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  const caption = document.createElement("figcaption");

  figure.id = "project-work-" + work.id;
  img.src = work.imageUrl;
  caption.innerText = work.title;

  img.setAttribute("alt", work.title);
  
  figure.appendChild(img);
  figure.appendChild(caption);
  gallery.appendChild(figure);
}

async function showWorks(categoryValue) {
  const allWorks = await getAllWorks();
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  if(categoryValue == 0) {
    addWorksToDocument(allWorks);
  } else {
    allWorks.forEach((work) => {
      if(categoryValue == work.categoryId) {
      addWork(work);
      }
    });
  }
}

showWorks(0);