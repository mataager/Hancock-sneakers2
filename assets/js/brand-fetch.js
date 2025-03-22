function getCategoryOrBrandFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("category") || urlParams.get("brand"); // Returns category or brand from URL
}

document.getElementById("brand-title").innerText = getCategoryOrBrandFromUrl();

// Global variables to keep track of current page and products per page
let currentPage = 1;
const itemsPerPage = 100;
let totalProducts = 0;
let allProducts = [];
let allData = {};

// Function to fetch and render products by category or brand
// Function to fetch and render products by category or brand
function fetchAndRenderProductsByCategoryOrBrand() {
  const categoryOrBrand = getCategoryOrBrandFromUrl(); // Get category or brand from URL

  if (categoryOrBrand) {
    fetch(`${url}/Stores/${uid}/Products.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          allData = data; // Store all product data
          filterProductsByCategoryOrBrand(categoryOrBrand); // Filter products by category or brand
          totalProducts = allProducts.length;
          renderProducts(); // Render the filtered products
        } else {
          console.log("No products found");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
}

// Function to filter products by category or brand
function filterProductsByCategoryOrBrand(categoryOrBrand) {
  if (categoryOrBrand) {
    allProducts = Object.keys(allData)
      .filter((key) => {
        const product = allData[key];
        // Case-insensitive matching for both category and brand
        return (
          product["category"]?.toLowerCase() ===
            categoryOrBrand.toLowerCase() ||
          product["Brand-Name"]?.toLowerCase() === categoryOrBrand.toLowerCase()
        );
      })
      .reverse(); // Reverse the product keys to sort from latest to earliest
  } else {
    allProducts = Object.keys(allData).reverse(); // Show all products if no category or brand is specified
  }
}

// Update the renderProducts function
function renderProducts() {
  const productList = document.querySelector(".product-list");
  productList.innerHTML = ""; // Clear existing products from the list

  if (totalProducts === 0) {
    // If no products found, display a message
    const sortby = document.querySelector(".sort-by");
    const noProductsMessage = document.createElement("div");
    noProductsMessage.classList.add("no-product-message-container");
    noProductsMessage.innerHTML = `<img src="https://i.imgur.com/xonwgsq_d.webp?maxwidth=760&fidelity=grand" width=300>`;
    productList.style.display = "block";
    sortby.style.display = "none";
    productList.appendChild(noProductsMessage);
    return;
  }

  const start = (currentPage - 1) * itemsPerPage;
  const end = Math.min(start + itemsPerPage, totalProducts);
  const productKeys = allProducts.slice(start, end);

  productKeys.forEach((key) => {
    const product = allData[key];

    // Extracting color options, sale amount, and other necessary data
    let colorOptionsHtml = ""; // Initialize color options HTML
    let seenColors = new Set(); // Set to track seen colors
    let extraColorsCount = 0; // Track number of extra colors

    if (product["sizes"]) {
      // Loop through each size and its colors
      Object.keys(product["sizes"]).forEach((size) => {
        const sizeData = product["sizes"][size];
        // Loop through each color within the size
        Object.keys(sizeData).forEach((color) => {
          const colorData = sizeData[color];
          if (!seenColors.has(colorData["color-value"])) {
            seenColors.add(colorData["color-value"]);
            if (seenColors.size <= 3) {
              colorOptionsHtml += `
                <div class="color-option2" style="background-color: ${colorData["color-value"]};" data-color-name="${color}"></div>`;
            } else {
              extraColorsCount++; // Increment count for extra colors
            }
          }
        });
      });
    }

    // If there are more than 3 colors, add the "more" button
    if (extraColorsCount > 0) {
      colorOptionsHtml += `
        <div class="color-option2 flex center align-items font-small" onclick="productDetails('${key}')" style="background-color: #e2e2e2;" data-color-name="more">+${extraColorsCount}</div>`;
    }

    const saleAmount = product["sale-amount"] || 0;
    const originalPrice = parseFloat(product["Product-Price"]);
    const salePrice = saleAmount
      ? (originalPrice - (originalPrice * saleAmount) / 100).toFixed(2)
      : originalPrice;
    // Check if the product is a best seller
    const bestSellerHTML = product["bestseller"]
      ? `<div class="best-seller" id="best-seller">bestseller<i class="bi bi-lightning-charge"></i></div>`
      : "";
    //

    const category = product["category"];
    const sizes = JSON.stringify(product["sizes"]);

    // Generate product card HTML
    const productCard = document.createElement("li");
    productCard.classList.add("product-item");

    productCard.innerHTML = `
      <div class="product-card" tabindex="0">
        <figure class="card-banner" id="cardBanner">
          <img src="${
            product["product-photo"]
          }" width="312" height="350" alt="${
      product["product-title"]
    }" class="image-contain" id="swipe1">
          <img src="${
            product["product-photo2"]
          }" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
          ${saleAmount ? `<div class="card-badge">-${saleAmount}%</div>` : ""}
          ${bestSellerHTML}
          <ul class="card-action-list">
            <li class="card-action-item">
              <button class="card-action-btn add-to-cart-btn" data-product-id="${key}" aria-labelledby="card-label-1">
                <ion-icon name="cart-outline" role="img" class="md hydrated" aria-label="cart outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
            </li>
            <li class="card-action-item" onclick="productDetails('${key}')">
              <button class="card-action-btn" aria-labelledby="card-label-3">
                <ion-icon name="eye-outline" role="img" class="md hydrated" aria-label="eye outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-3">Quick View</div>
            </li>
            <li class="card-action-item" onclick="addfavouriteproduct('${key}')">
              <button class="card-action-btn" aria-labelledby="card-label-3">
                <ion-icon name="heart-outline" role="img" class="md hydrated" aria-label="heart-outline"></ion-icon>
              </button>
              <div class="card-action-tooltip" id="card-label-3">Add to Favourite</div>
            </li>
          </ul>
        </figure>
        <div class="card-content">
          <div class="color-options m-5 mb-7 center">${colorOptionsHtml}</div>
          <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
            <a class="title" href="#">${product["product-title"]}</a>
          </h3>
          ${
            saleAmount
              ? `<del id="preprice" class="m-5 mb-10 pre-sale">${originalPrice} EGP</del>`
              : ""
          }
          <p class="card-price">${salePrice} EGP</p>
          <a href="#" class="card-price hidden font-small">${key}</a>
        </div>
        <div class="hidden" data-category="${category}" data-sizes="${sizes}">sorting helper</div>
      </div>`;

    productList.appendChild(productCard);
  });

  updatePaginationButtons();
  // Set up event listeners for "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) =>
    button.addEventListener("click", (event) => {
      const productId =
        event.target.closest(".add-to-cart-btn").dataset.productId;
      openCartModal(productId);
    })
  );
}

// Update pagination buttons
function updatePaginationButtons() {
  document.getElementById("prevPageBtn").disabled = currentPage === 1;
  document.getElementById("nextPageBtn").disabled =
    currentPage * itemsPerPage >= totalProducts;
}

// On page load, fetch and render products by category or brand
window.addEventListener("load", fetchAndRenderProductsByCategoryOrBrand);
