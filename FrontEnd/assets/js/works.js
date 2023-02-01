async function getAllWorks() {
  try {
      const res = await fetch("http://localhost:5678/api/works");
      if (res.ok) {
        const works = await res.json();
        addWorksToDocument(works);
      }
    } catch (err) {
      console.error(err);
    };
}

function addWorksToDocument(works) {
  works.forEach(function(work) {
      const gallery = document.getElementById("gallery");
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const caption = document.createElement("figcaption");

      img.src = work.imageUrl;
      caption.innerText = work.title;

      img.setAttribute("alt", work.title);

      figure.appendChild(img);
      figure.appendChild(caption);
      gallery.appendChild(figure);
  });
}

getAllWorks();