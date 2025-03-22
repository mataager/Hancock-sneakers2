function fetchAndRenderProducts() {
  document.getElementById("preloader").style.display = "flex";
  fetch(`${url}/Stores/${uid}/Products.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Check if data is not empty
      if (data) {
        const productOverview = document.querySelector(".product-overview");
        const newArrivalsContainer = document.getElementById("NewArrivalls");
        const saleContainer = document.getElementById("Sale");

        if (!newArrivalsContainer) {
          console.error("New Arrivals container not found.");
          return;
        }

        if (!saleContainer) {
          console.error("Sale container not found.");
          return;
        }

        productOverview.innerHTML = ""; // Clear existing products from the overview
        newArrivalsContainer.innerHTML = ""; // Clear existing new arrivals
        saleContainer.innerHTML = ""; // Clear existing sale items

        // Shuffle the product data
        const shuffledData = shuffle(Object.entries(data));

        // Get the last 15 products for New Arrivals
        const newArrivalsData = shuffledData.slice(-15);

        // Render New Arrivals
        newArrivalsData.forEach(([key, product]) => {
          const newProductItem = document.createElement("li");
          newProductItem.classList.add("product-item");

          const productCard = document.createElement("div");
          productCard.classList.add("fit-content");

          const saleAmount = product["sale-amount"];
          const originalPrice = product["Product-Price"];

          function calculateSalePrice(originalPrice, saleAmount) {
            // Ensure originalPrice and saleAmount are integers
            const intOriginalPrice = Math.floor(originalPrice);
            const intSaleAmount = Math.floor(saleAmount);

            // Calculate sale price
            const salePrice = intOriginalPrice * (1 - intSaleAmount / 100);

            // Return the integer part of the sale price
            return Math.floor(salePrice);
          }

          const salePrice = calculateSalePrice(originalPrice, saleAmount);
          // Check if the product is a best seller
          const bestSellerHTML = product["bestseller"]
            ? `<div class="best-seller" id="best-seller">bestseller<i class="bi bi-lightning-charge"></i></div>`
            : "";
          //

          // Check and set default image source if necessary
          setDefaultImageSource(product);
          // Adjust this part according to your product card structure
          productCard.innerHTML = `
            <div class="product-card" tabindex="0">
              <figure class="card-banner">
                <img src="${product["product-photo"]}" width="312" height="350" alt=""class="image-contain" id="swipe1">
                <img src="${product["product-photo2"]}" width="312" height="350" alt="" id="swipe2" class="image-contain" style="display: none;">
                <div class="card-badge">New</div>
                ${bestSellerHTML}
                <ul class="card-action-list">
                  <li class="card-action-item">
                    <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
              <div class="card-content mt-10">
                <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
                  <a class="title" href="#">${product["product-title"]}</a>
                </h3>
                <p class="card-price">${salePrice} EGP</p>
                <a href="#" class="card-price hidden font-small">${key}</a>
              </div>
            </div>
          `;

          newProductItem.appendChild(productCard);
          newArrivalsContainer.appendChild(newProductItem);

          // Setup hover effect for the new product card
          setupHoverEffect(productCard);
        });

        // Limit the number of products to be displayed in the main product overview to 12
        const limitedData = shuffledData.slice(0, 12);

        // Iterate through the limited data and render each product in the product overview
        limitedData.forEach(([key, product]) => {
          const productCard = document.createElement("div");
          productCard.classList.add("product-card-overview");

          // Get colors for all sizes if sizes property exists (your existing logic)
          const allColors = new Set();
          const colorValues = {};
          if (product.sizes) {
            Object.values(product.sizes).forEach((sizeDetails) => {
              if (sizeDetails) {
                Object.keys(sizeDetails).forEach((color) => {
                  allColors.add(color);
                  colorValues[color] = sizeDetails[color]["color-value"];
                });
              }
            });
          }

          // Construct color options HTML (your existing logic)
          let colorOptionsHTML = "";
          const colorsArray = Array.from(allColors);
          const displayColors = colorsArray.slice(0, 3);

          displayColors.forEach((color) => {
            const colorValue = colorValues[color] || "#000000"; // Default color if not found
            colorOptionsHTML += `<div class="color-option2 " style="background-color: ${colorValue};" data-color-name="${color}"></div>`;
          });

          if (colorsArray.length > 3) {
            colorOptionsHTML += `<div class="color-option2 flex center align-items font-small"  onclick="productDetails('${key}')" style="background-color: #e2e2e2;" data-color-name="more">+${
              allColors.size - 3
            }</div>`;
          }

          const colorOptionsContainer =
            allColors.size > 0
              ? `<div class="color-options m-5 mb-7 center">${colorOptionsHTML}</div>`
              : `<p class="no-color-options mb-7">No color options available</p>`;

          const saleAmount = product["sale-amount"];
          const originalPrice = product["Product-Price"];

          function calculateSalePrice(originalPrice, saleAmount) {
            // Ensure originalPrice and saleAmount are integers
            const intOriginalPrice = Math.floor(originalPrice);
            const intSaleAmount = Math.floor(saleAmount);

            // Calculate sale price
            const salePrice = intOriginalPrice * (1 - intSaleAmount / 100);

            // Return the integer part of the sale price
            return Math.floor(salePrice);
          }
          // Check if the product is a best seller
          const bestSellerHTML = product["bestseller"]
            ? `<div class="best-seller" id="best-seller">bestseller<i class="bi bi-lightning-charge"></i></div>`
            : "";
          //
          const salePrice = calculateSalePrice(originalPrice, saleAmount);
          setDefaultImageSource(product);

          // Construct product card HTML (your existing logic)
          productCard.innerHTML = `
            <div class="product-card" tabindex="0">
              <figure class="card-banner">
                <img src="${
                  product["product-photo"]
                }" width="312" height="350" alt="" class="image-contain" id="swipe1">
                <img src="${
                  product["product-photo2"]
                }" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
                ${
                  saleAmount
                    ? `<div class="card-badge">-${saleAmount}%</div>`
                    : ""
                }
                ${bestSellerHTML}
               
                <ul class="card-action-list">
                  <li class="card-action-item">
                    <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
                ${colorOptionsContainer}
                <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
                  <a class="title" href="#">${product["product-title"]}</a>
                </h3>
                <p class="card-price">${salePrice} EGP</p>
                <a href="#" class="card-price hidden font-small">${key}</a>
              </div>
            </div>
          `;

          productOverview.appendChild(productCard);
          setDefaultImageSource(product);
          // Set up hover effect for the product card in the product overview
          setupHoverEffect(productCard);
        });

        // Render Sale Items
        renderSaleItems(shuffledData, saleContainer);

        // Set up event listeners for "Add to Cart" buttons (your existing logic)
        const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
        addToCartButtons.forEach((button) =>
          button.addEventListener("click", (event) => {
            const productId =
              event.target.closest(".add-to-cart-btn").dataset.productId;
            openCartModal(productId);
          })
        );
      } else {
        const productOverview = document.getElementById("mainpage");
        document.getElementById("preloader").style.display = "none";
        productOverview.innerHTML = `<div class="no-product-message-container">
        <img src="https://i.imgur.com/xonwgsq_d.webp?maxwidth=760&fidelity=grand" width=300>
        
    </div>`;
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Helper function to get color value from the product data (your existing logic)
function getColorValue(product, color) {
  if (product.sizes) {
    for (const size in product.sizes) {
      if (product.sizes[size][color]) {
        return product.sizes[size][color]["color-value"];
      }
    }
  }
  return "#000000"; // Default color if not found
}

// Function to set up hover effect (your existing logic)
function setupHoverEffect(productCard) {
  const swipe1 = productCard.querySelector("#swipe1");
  const swipe2 = productCard.querySelector("#swipe2");

  productCard.addEventListener("mouseenter", () => {
    swipe1.style.display = "none";
    swipe2.style.display = "block";
  });
  productCard.addEventListener("mouseleave", () => {
    swipe1.style.display = "block";
    swipe2.style.display = "none";
  });
}

// Helper function to calculate sale price
function calculateSalePrice(originalPrice, saleAmount) {
  return (originalPrice * (1 - saleAmount / 100)).toFixed(2);
}

// Function to render sale items (limited to first 20)
function renderSaleItems(products, saleContainer) {
  let saleItemCount = 0;
  products.forEach(([key, product]) => {
    if (product["sale-amount"] && saleItemCount < 20) {
      const saleItem = document.createElement("li");
      saleItem.classList.add("product-item");

      const productCard = document.createElement("div");
      productCard.classList.add("fit-content");

      const saleAmount = product["sale-amount"];
      const originalPrice = product["Product-Price"];
      const salePrice = calculateSalePrice(originalPrice, saleAmount);

      // Check if the product is a best seller
      const bestSellerHTML = product["bestseller"]
        ? `<div class="best-seller" id="best-seller">bestseller<i class="bi bi-lightning-charge"></i></div>`
        : "";
      //

      productCard.innerHTML = `
        <div class="product-card" tabindex="0">
          <figure class="card-banner">
            <img src="${product["product-photo"]}" width="312" height="350" alt="" class="image-contain" id="swipe1">
            <img src="${product["product-photo2"]}" width="312" height="350" id="swipe2" class="image-contain" style="display: none;">
            <div class="card-badge"> -${saleAmount}%</div>
            ${bestSellerHTML}
            <ul class="card-action-list">
              <li class="card-action-item">
                <button class="card-action-btn add-to-cart-btn" aria-labelledby="card-label-1" data-product-id="${key}">
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
          <div class="card-content mt-10">
            <h3 class="h3 card-title mb-7" onclick="productDetails('${key}')">
              <a class="title" href="#">${product["product-title"]}</a>
            </h3>
            <del class="pre-sale">${originalPrice} EGP</del>
            <p class="card-price">${salePrice} EGP</p>
            <a href="#" class="card-price hidden font-small">${key}</a>
          </div>
        </div>
      `;
      setDefaultImageSource(product);
      saleItem.appendChild(productCard);
      saleContainer.appendChild(saleItem);

      // Setup hover effect for the sale product card
      setupHoverEffect(productCard);

      saleItemCount++;
      document.getElementById("preloader").style.display = "none";
    } else {
      document.getElementById("preloader").style.display = "none";
    }
  });
}

// Fetch and render products including New Arrivals and Sale Items on page load
window.addEventListener("load", fetchAndRenderProducts);

// Shuffle function to randomize the order of elements in an array (your existing logic)
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
