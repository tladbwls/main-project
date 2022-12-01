/*************Elements colne For Mobile*********/
const mobileMenus = document.querySelector(".mobile-menus");
const navs = document.querySelector(".nav-lists").cloneNode(true);
const info = document.querySelector(".info").cloneNode(true);

// console.log(navs);

mobileMenus.appendChild(navs);
mobileMenus.appendChild(info);

/*************Mobile Menu Toggle*********/
const mobileBtn = document.querySelector(".mobile-btn");
toggleMobileBtn = (e) => {
  const target = e.currentTarget;
  const menuHeight = mobileMenus.scrollHeight; //scroll Height: 지정 대상의 높이값을 읽어준다.
  target.classList.toggle("active");

  if (target.classList.contains("active")) {
    target.classList.remove("not-active");
    mobileMenus.style.height = menuHeight + "px";
  } else {
    target.classList.add("not-active");
    mobileMenus.style.height = 0;
  }
};

mobileBtn.addEventListener("click", toggleMobileBtn);

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

/********** Scroll Reveal Effect **********/
const sr = ScrollReveal({
  reset: false,
});

sr.reveal(".wrapper", { duration: 1000 });
sr.reveal(".landing-text-box", {
  duration: 1000,
  origin: "right",
  distance: "80px",
});
sr.reveal(".meet-text-box .swiper", {
  duration: 2000,
  origin: "bottom",
  distance: "40px",
});
sr.reveal(".meet-wrapper img, .feature ", {
  duration: 1000,
  origin: "bottom",
  distance: "40px",
  interval: 200,
});

/********** Swiper slider Effect **********/
const swiper = new Swiper(".swiper", {
  loop: true, //슬라이더 무한 반복
  navigation: {
    //네비게이션
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    //슬라이더 인디케이터
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
});
