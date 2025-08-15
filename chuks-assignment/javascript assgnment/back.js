let productDetail = document.querySelector(".product-full-details");
let loader = document.querySelector(".loader");
let cartItems = document.querySelector(".total-cart-items");
let backBtn = document.querySelector(".back-to-homepage");

window.addEventListener("DOMContentLoaded", () => {
  totalItemsInCart();
});

backBtn.addEventListener("click", function () {
  // totalItemsInCart();
  // getItemsFromSessionStorage();
  // history.go(-1);
  window.location.href = "/index.html";
});

let cart = JSON.parse(localStorage.getItem("cartItems")) || [];

function getItemsFromSessionStorage() {
  return JSON.parse(sessionStorage.getItem("itemId"));
}

function localStore() {
  return localStorage.setItem("cartItems", JSON.stringify(cart));
}

localStore();

function totalItemsInCart() {
  let totalItems = cart
    .map((item) => item.quantity)
    .reduce((acc, counter) => acc + counter, 0);
  cartItems.textContent = totalItems;
  alternateDisplay(totalItems);
  return totalItems;
}

function alternateDisplay(num) {
  if (num < 1) {
    cartItems.style.display = "none";
  } else {
    cartItems.style.display = "flex";
  }
}

async function addToCart(productId) {
  console.log("product added to cart");
  let product = await fetchSingleProduct(productId);
  const { id, title, image, price, category } = product;
  const newItem = { id, title, image, category, price, quantity: 1 };

  let foundItem = cart.find((item) => item.id === newItem.id);

  if (foundItem) foundItem.quantity += 1;
  else cart.push(newItem);

  localStore();
  totalItemsInCart();
}

window.addEventListener("DOMContentLoaded", async () => {
  let id = getItemsFromSessionStorage();
  if (!id) alert("No item id found");
  let product = await fetchSingleProduct(id);
  if (product) {
    generateSingleProduct(product);
  }
});

async function fetchSingleProduct(id) {
  try {
    loader.classList.remove("hideLoader");
    let req = await fetch(`https://fakestoreapi.com/products/${id}`);
    if (!req.ok) throw new Error("Product not found");
    let res = await req.json();
    loader.classList.add("hideLoader");
    return res;
  } catch (error) {
    console.error(error.message);
  }
}

function generateSingleProduct(item) {
  let html = `
      <div class="single-product-card">
        <div class="photo">
          <img src="${item.image}" alt="product image" class="full-image-photo" />
        </div>
        <div class="prod-details-text">
          <div class="text">
            <h2 class="prod-title full-title">${item.title}</h2>
            <p class="product-description full-description">${item.description}</p>
            <p class="product-price full-price">₦${item.price}</p>
          </div>
          <div>
            <button class="product-btn" data-id="${item.id}">Add to Cart</button>
          </div>
        </div>
      </div>
`;
  productDetail.innerHTML = html;
}

productDetail.addEventListener("click", function (e) {
  let target = e.target;
  if (!target.classList.contains("product-btn")) return;
  addToCart(target.dataset.id);
});
