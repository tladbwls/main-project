window.addEventListener("load", function () {
  /*************Header change Effect*********/
  const header = document.querySelector("#header");
  const stickyHeader = () => {
    const scry = window.scrollY;
    if (scry > 0) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  };
  window.addEventListener("scroll", stickyHeader);
});
