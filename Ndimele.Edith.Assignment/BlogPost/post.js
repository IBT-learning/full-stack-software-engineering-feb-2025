let postContainer = document.querySelector(".flex-post-container");

let backBtn = document.querySelector(".bck-btn");

let menuOpen = document.querySelector(".hamburger");
let menuClose = document.querySelector(".close-menu-bar");
let mobileNav = document.querySelector(".mobile-nav");

menuOpen.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
});
menuClose.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
});

window.addEventListener("DOMContentLoaded", () => {
  let data = JSON.parse(sessionStorage.getItem("post"));
  loadHTML(data);
});

function loadHTML(data) {
  let html = `
    <figure class="post-card-photo-container">
        <img src="/img/test.png" alt="test" class="post-photo" />
    </figure>
    <div class="text-container">
        <h1 class="text-title">${data.title}</h1>
        <p class="text-description">${data.body}</p>
    </div>
`;

  postContainer.innerHTML = html;
}

backBtn.addEventListener("click", () => (window.location.href = "/index.html"));
