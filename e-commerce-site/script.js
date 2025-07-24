document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  const cartCount = document.getElementById("cart-count");
  const searchInput = document.querySelector(".search-input");
  const categorySelect = document.querySelector(".category-select");
  const paginationContainer = document.querySelector(".pagination");
  const payBtn = document.querySelector(".pay-btn");
  const searchBtn = document.getElementById("search-btn");
  const productSection = document.querySelector("#all-products");
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");

  let products = [];
  let filteredProducts = [];
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let currentPage = 1;
  const productsPerPage = 20;

  // --- CART COUNT ---
  function updateCartCount() {
    const uniqueProductIds = new Set(cart.map(item => item.id));
    cartCount.textContent = uniqueProductIds.size;
  }

  // --- SAVE CART ---
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderOrders();
  }

  // --- ADD TO CART ---
  function addToCart(productId) {
    const product = products.find((p) => p.id == productId);
    if (!product) return;

    const existing = cart.find((p) => p.id == productId);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    showToast(`✅ ${product.title} added to cart`, "#28a745");
    saveCart();
  }

  // --- SHOW TOAST ---
  function showToast(message, bgColor = "#333") {
    const toast = document.createElement("div");
    toast.className = "product-toast";
    toast.textContent = message;
    toast.style.backgroundColor = bgColor;
    toast.style.bottom = `${30 + document.querySelectorAll(".product-toast").length * 60}px`;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
    }, 2000);

    setTimeout(() => toast.remove(), 3000);
  }

  // --- FETCH PRODUCTS ---
  async function fetchProducts() {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      products = await res.json();
      filteredProducts = [...products];
      populateCategories();
      displayProducts();
      renderPagination();
      updateCartCount();
      renderOrders();
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  }

  // --- POPULATE CATEGORIES ---
  function populateCategories() {
    const categories = [...new Set(products.map((p) => p.category))];
    categorySelect.innerHTML =
      `<option value="">Choose Category</option>` +
      categories.map((cat) => `<option value="${cat}">${toTitleCase(cat)}</option>`).join("");
  }

  function toTitleCase(str) {
  if (!str) return "";
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
  });
}

  // --- DISPLAY PRODUCTS ---
  function displayProducts() {
    const start = (currentPage - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginated = filteredProducts.slice(start, end);
    productList.innerHTML = "";

    paginated.forEach((product) => {
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${product.image}" alt="${product.title}" class="product-img"/>
        <div class="title-container">
          <h3 class="product-title">${product.title.split(" ")[0]}</h3>
          <div class="extra-details" style="display: none;">
            <p>${product.title.split(" ").slice(1).join(" ")}</p>
            <p class="product-description">${product.description}</p>
          </div>
          <a href="#" class="toggle-details">See More</a>
        </div>
        <p class="product-category"><strong>Category:</strong> ${product.category}</p>
        <p><strong>$${product.price.toFixed(2)}</strong></p>
        <div class="product-buttons">
          <button class="add-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      `;
      productList.appendChild(div);
    });

    document.querySelectorAll(".add-btn").forEach((btn) => {
      btn.onclick = () => addToCart(btn.dataset.id);
    });

    document.querySelectorAll(".toggle-details").forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        const container = this.closest(".title-container");
        const title = container.querySelector(".product-title");
        const extra = container.querySelector(".extra-details");
        const isExpanded = extra.style.display === "block";
        extra.style.display = isExpanded ? "none" : "block";
        title.classList.toggle("full-title", !isExpanded);
        this.textContent = isExpanded ? "See More" : "See Less";
      });
    });
  }

  // --- PAGINATION ---
  function renderPagination() {
    const pages = Math.ceil(filteredProducts.length / productsPerPage);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= pages; i++) {
      const btn = document.createElement("button");
      btn.textContent = i;
      btn.className = "pagination-btn" + (i === currentPage ? " active" : "");
      btn.onclick = () => {
        currentPage = i;
        displayProducts();
        renderPagination();
      };
      paginationContainer.appendChild(btn);
    }
  }

  // --- RENDER ORDERS ---
  function renderOrders() {
    const tbody = document.getElementById("order-list");
    const totalItems = document.getElementById("checkout-items");
    const totalPrice = document.getElementById("checkout-total");

    if (!tbody || !totalItems || !totalPrice) return;

    tbody.innerHTML = "";
    let totalQty = 0;
    let totalCost = 0;

    if (cart.length === 0) {
      tbody.innerHTML = `<tr><td colspan="6" style="text-align:center">No items in cart.</td></tr>`;
      totalItems.textContent = "0";
      totalPrice.textContent = "0.00";
      return;
    }

    cart.forEach((item) => {
      const qty = item.quantity || 1;
      const unitTotal = item.price * qty;
      totalQty += qty;
      totalCost += unitTotal;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td><img src="${item.image}" alt="${item.title}" style="width:50px; height:50px"/></td>
        <td>${item.title}</td>
        <td>
          <div class="order-controls">
            <button class="decrease-btn" data-id="${item.id}">-</button>
            <span>${qty}</span>
            <button class="increase-btn" data-id="${item.id}">+</button>
          </div>
        </td>
        <td>$${item.price.toFixed(2)}</td>
        <td>$${unitTotal.toFixed(2)}</td>
      `;
      tbody.appendChild(tr);
    });

    totalItems.textContent = totalQty;
    totalPrice.textContent = totalCost.toFixed(2);
  }

  // --- QUANTITY INCREASE/DECREASE ---
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("increase-btn")) {
      const item = cart.find((p) => p.id == e.target.dataset.id);
      if (item) {
        item.quantity++;
        saveCart();
      }
    } else if (e.target.classList.contains("decrease-btn")) {
      const item = cart.find((p) => p.id == e.target.dataset.id);
      if (item) {
        item.quantity--;
        if (item.quantity <= 0) {
          cart = cart.filter((p) => p.id != item.id);
        }
        saveCart();
      }
    }
  });

  // --- SEARCH FILTER ---
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();
    filteredProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    displayProducts();
    renderPagination();

    if (searchInput.value.trim() !== '') {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // --- CATEGORY FILTER ---
  categorySelect.addEventListener("change", () => {
    const selected = categorySelect.value;
    filteredProducts = selected
      ? products.filter((p) => p.category === selected)
      : [...products];
    currentPage = 1;
    displayProducts();
    renderPagination();

    if (selected !== '') {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // --- PAY BUTTON ---
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      if (cart.length === 0) return alert("No items to pay for.");
      alert("🎉 Payment successful!");
      cart = [];
      saveCart();
    });
  }

  // --- NAVBAR SEARCH BUTTON ---
  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const keyword = document.getElementById("search-input").value.trim().toLowerCase();
      if (keyword) {
        filteredProducts = products.filter((p) =>
          p.title.toLowerCase().includes(keyword)
        );
        currentPage = 1;
        displayProducts();
        renderPagination();
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // --- MOBILE NAV TOGGLE ---
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("show");
      });
    });
  }

  fetchProducts();
});