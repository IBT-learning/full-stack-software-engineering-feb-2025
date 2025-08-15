let backBtn = document.querySelector(".back-to-homepage");
let cartTable = document.querySelector("table");
let tableBody = document.querySelector("tbody");
let totalUnitsEl = document.querySelector(".total-items");
let totalPriceEl = document.querySelector(".total-price");
let cartItems = document.querySelector(".total-cart-items");
let checkoutContainer = document.querySelector(".checkout-section");
let checkoutEl = document.querySelector(".max-width-container");
let emptyCartEl = document.querySelector(".empty-cart-para");

window.addEventListener("DOMContentLoaded", function () {
  getItemsFromLocalStorage();
  totalNumOfItems();
  totalPrice();
  generateMarkUp();
});

backBtn.addEventListener("click", () => (window.location.href = "/index.html"));

function getItemsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("cartItems"));
}

let cart = getItemsFromLocalStorage() || [];

function localStore() {
  return localStorage.setItem("cartItems", JSON.stringify(cart));
}

function alternateDisplay(arr) {
  if (arr < 1) {
    checkoutContainer.classList.add("flex");
    emptyCartEl.classList.remove("hidden");
    checkoutEl.style.display = "none";
    cartItems.style.display = "none";
  } else {
    checkoutEl.style.display = "flex";
    cartItems.style.display = "flex";
    checkoutContainer.classList.remove("flex");
    emptyCartEl.classList.add("hidden");
  }
}

function totalNumOfItems() {
  let totalItems = cart.reduce((acc, count) => acc + count.quantity, 0);
  cartItems.textContent = totalItems;
  totalUnitsEl.value = totalItems;
  checkoutContainer.class;
  alternateDisplay(totalItems);
  return totalItems;
}

function totalPrice() {
  let totalPrice = cart
    .map((item) => item.quantity * item.price)
    .reduce((acc, counter) => acc + counter, 0);
  totalPriceEl.value = `₦${totalPrice.toFixed(2)}`;
  return totalPrice;
}

function deleteItem(targetEl, id) {
  let newArr = cart.filter((item) => item.id !== +id);
  cart = newArr;
  localStore();
  targetEl.closest("tr").remove();
  generateMarkUp();
  totalNumOfItems();
  totalPrice();
}

function generateMarkUp() {
  let generatedItems = cart
    .map((item) => {
      tableBody.innerHTML = "";
      return ` <tr>
  <td class="small-img-container">
  <img src="${item.image}" class="small-photo" alt=""/>
  </td>
        <td>${item.title.split(" ").slice(0, 1)}</td>
        <td>${item.quantity}</td>
        <td>₦${item.price.toFixed(2)}</td>
        <td>₦${item.price * item.quantity}</td>
        <td>
        <button class="delete-btn" data-id="${item.id}">X</button>
    </td>
    `;
    })
    .join("");
  tableBody.insertAdjacentHTML("afterbegin", generatedItems);
}

cartTable.addEventListener("click", (e) => {
  let targetEl = e.target;
  if (!targetEl.classList.contains("delete-btn")) return;
  else deleteItem(targetEl, targetEl.dataset.id);
});
