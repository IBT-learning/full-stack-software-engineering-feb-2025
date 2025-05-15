const hamburgerIcon = document.querySelector(".hamburger-icon");
const mobileNavBar = document.querySelector(".mobile-navbar");

hamburgerIcon.addEventListener("click", ()=> {
    mobileNavBar.classList.toggle("show");
})