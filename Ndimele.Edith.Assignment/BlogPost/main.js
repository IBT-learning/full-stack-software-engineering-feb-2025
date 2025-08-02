const gridcontainer = document.querySelector(".grid-container");
let rightBtn = document.querySelector(".rightBtn");
let leftBtn = document.querySelector(".leftBtn");
let startPage = document.querySelector(".start-page");
let endPage = document.querySelector(".end-page");

let menuOpen = document.querySelector(".hamburger");
let menuClose = document.querySelector(".close-menu-bar");
let mobileNav = document.querySelector(".mobile-nav");

/* MOBILE HAMBURGER MENU OPEN */
menuOpen.addEventListener("click", () => {
  mobileNav.classList.remove("hidden");
});

/* MOBILE HAMBURGER MENU CLOSE */
menuClose.addEventListener("click", () => {
  mobileNav.classList.add("hidden");
});

const api_url = "https://jsonplaceholder.typicode.com/posts";

window.addEventListener("DOMContentLoaded", () => {
  getPosts();
  displayPage(1);
});

let arrOfData = JSON.parse(localStorage.getItem("arrOfData"));

// generateMarkup(res);

function storeDataInLocalStorage() {
  return localStorage.setItem("arrOfData", JSON.stringify(arrOfData));
}

function tempStorage(post) {
  return sessionStorage.setItem("post", JSON.stringify(post));
}

async function getPosts() {
  try {
    let req = await fetch(api_url);
    if (!req.ok) throw new Error("Posts  not found");
    let res = await req.json();
    arrOfData = res;
    storeDataInLocalStorage();
    // generateMarkup(res);
  } catch (error) {
    console.error(error.message);
  }
}

//pagination function

const data = arrOfData;
const itemsPerPage = 10;
let currentPage = 1;

function displayPage(pageNumber) {
  const startIndex = (pageNumber - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = data.slice(startIndex, endIndex);
  generateMarkup(pageData);
  // call generateHTML function to update data in UI
  startPage.textContent = currentPage;
  endPage.textContent = data.length / itemsPerPage;
  return pageData;
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    displayPage(currentPage);
  }
}

function nextPage() {
  const totalPages = Math.ceil(data.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayPage(currentPage);
  }
}

leftBtn.addEventListener("click", previousPage);
rightBtn.addEventListener("click", nextPage);

function trimHTML(post, length) {
  return post.split(" ").length > length
    ? post.split(" ").slice(0, length).join(" ") + "..."
    : post;
}

function generateMarkup(res) {
  gridcontainer.innerHTML = "";

  let html = res
    .map((post) => {
      let title = trimHTML(post.title, 4);
      const body = trimHTML(post.body, 8);
      return `
    <article class="card" data-id="${post.id}">
        <figure class="card-photo-container">
            <img src="/img/test.png" alt="test" />
        </figure>
        <div class="card-text-container">
           <div class="">
             <h1 class="post-title">${title}</h1>
              <p class="post-description">
                ${body}
              </p>
           </div>
            <a href="#${post.id}" data-id="${post.id} class="read-more">Read more</a>
        </div>
    </article>
`;
    })
    .join("");
  gridcontainer.innerHTML = html;
}

window.addEventListener("hashchange", () => {
  let id = window.location.hash.split("")[1];
  getPost(id);
});

async function getPost(id) {
  try {
    let req = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!req.ok) throw new Error("Post not found");
    let res = await req.json();
    console.log(res);
    tempStorage(res);
    window.location.href = "/post.html";
  } catch (error) {
    console.log(error.message);
  }
}
