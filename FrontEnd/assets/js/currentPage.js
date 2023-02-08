const links = document.querySelectorAll(".navLinks a").forEach(link => {
  console.log(link.href, window.location.href);
    if (link.href === window.location.href) {
    link.classList.add("currentLink");
  };
})