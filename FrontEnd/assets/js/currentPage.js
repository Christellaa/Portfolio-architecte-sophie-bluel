document.querySelectorAll(".navLinks a").forEach(link => {
    if (link.href === window.location.href) {
    link.classList.add("currentLink");
  };
})