let productsContainer = document.querySelector(".product-grid");
let productDetail = document.querySelector(".product-full-details");
let cartItems = document.querySelector(".total-cart-items");
let loader = document.querySelector(".loader");

const allProductsAPI = "https://fakestoreapi.com/products";

window.addEventListener("DOMContentLoaded", () => {
  data();
  totalItemsInCart();
});

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

let storeSession = function (id) {
  return sessionStorage.setItem("itemId", JSON.stringify(id));
};

function localStore() {
  return localStorage.setItem("cartItems", JSON.stringify(cart));
}

// localStore();

async function data() {
  try {
    loader.classList.remove("hideLoader");
    let req = await fetch(allProductsAPI);
    if (!req.ok) throw new Error("Products not found");
    const res = await req.json();
    loader.classList.add("hideLoader");
    generateHtml(res);
  } catch (error) {
    console.error(error.message);
  }
}

//TRUNCATE WORD
let truncate = (word, maxLength) => {
  let arrOfWords =
    word.split(" ").length > maxLength
      ? word.split(" ").slice(0, maxLength).join(" ") + "..."
      : word;
  return arrOfWords;
};

function generateHtml(res) {
  productsContainer.innerHTML = "";
  let htmlCards = res.map((item) => {
    let title = truncate(item.title, 3);
    let description = truncate(item.description, 8);

    return `<div class="product-card">
        <div class="photo-box">
        <img src="${item.image}" alt="product image" class="image-photo" />
        </div>
        <div class="prod-details">
        <div class="title-and-description">
        <div class="text">
          <h2 class="prod-title">${title}</h2>
          <p class="product-description">${description} <a href='#${item.id}' class="read-more-link" data-id="${item.id}">Read more</a></p>
        </div>
          <p class="product-price">₦${item.price}</p>
        </div>
          <button class="product-btn" data-id="${item.id}">Add to Cart</button>
          </div>
      </div>
`;
  });

  productsContainer.insertAdjacentHTML("afterbegin", htmlCards.join(""));
}

const getProductId = function (id) {
  storeSession(id);
  setTimeout(() => {
    window.location.href = "/product.html";
  }, 1000);
};

const totalItemsInCart = function () {
  let totalItems = cart
    .map((item) => item.quantity)
    .reduce((acc, counter) => acc + counter, 0);
  cartItems.textContent = totalItems;
  alternateDisplay(totalItems);
  return totalItems;
};

function alternateDisplay(num) {
  if (num < 1) {
    cartItems.style.display = "none";
  } else {
    cartItems.style.display = "flex";
  }
}

async function addToCart(productId) {
  let product = await fetchSingleProduct(productId);
  const { id, title, image, price, category } = product;
  const newItem = { id, title, image, category, price, quantity: 1 };

  let foundItem = cart.find((item) => item.id === newItem.id);

  if (foundItem) foundItem.quantity += 1;
  else cart.push(newItem);

  localStore();
  totalItemsInCart();
}

const handleIdandCart = async function (e) {
  let targetProduct = e.target;
  let productId = targetProduct.dataset.id;

  if (targetProduct.classList.contains("read-more-link"))
    getProductId(productId);
  if (targetProduct.classList.contains("product-btn")) addToCart(productId);
};

productsContainer.addEventListener("click", handleIdandCart);

async function fetchSingleProduct(id) {
  let res;
  try {
    loader.classList.remove("hideLoader");
    let req = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!req.ok) throw new Error("Product not found");
    res = await req.json();
    loader.classList.add("hideLoader");
  } catch (error) {
    console.error(error.message);
  }
  return res;
}
