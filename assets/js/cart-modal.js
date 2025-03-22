function addToCart() {
  const title = document.getElementById("productTitle").innerText;
  const brandName = document.getElementById("BrandName").innerText;
  const productPrice = document.getElementById("productPrice").innerText;
  const productSize = document.getElementById("product-Size").innerText;
  const productColor = document.getElementById("product-color").innerText;
  const productID = document.getElementById("productID").innerText;

  // Get the reference to the img element
  const productImage = document.getElementById("productImage");

  // Get the src attribute value
  const srcValue = productImage.getAttribute("src");

  const newItem = {
    id: productID,
    brand: brandName,
    title: title,
    productSize: productSize,
    productColor: productColor,
    price: productPrice,
    photourl: srcValue,
    quantity: 1, // Initialize quantity
  };

  // Retrieve cart from local storage or initialize it as an empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if an item with the same ID, size, and color already exists
  const existingItem = cart.find(
    (item) =>
      item.id === newItem.id &&
      item.productSize === newItem.productSize &&
      item.productColor === newItem.productColor
  );

  if (existingItem) {
    // If the item exists, increase its quantity
    existingItem.quantity += 1;
  } else {
    // If the item doesn't exist, add it as a new item
    cart.push(newItem);
  }

  // Store the updated cart back to local storage
  localStorage.setItem("cart", JSON.stringify(cart));

  // Change button text and add a message using SweetAlert
  Swal.fire({
    icon: "success",
    title: "Added to Cart",
    showConfirmButton: false,
    timer: 1500, // Close the alert after 1.5 seconds
  });

  updateCartCount();

  // Function to reload the window
  function reloadWindow() {
    location.reload();
  }
}

// Function to open the cart modal with product details
function openCartModal(productId) {
  // Add class to body to prevent background scrolling
  document.body.classList.add("modal-open");

  // Fetch product details from the specific URL
  fetch(`${url}/Stores/${uid}/Products/${productId}.json`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((product) => {
      // Render product details in the modal
      const modalContent = document.querySelector(".modal-content");

      const saleAmount = product["sale-amount"];
      const originalPrice = product["Product-Price"];

      function calculateSalePrice(originalPrice, saleAmount) {
        return (originalPrice * (1 - saleAmount / 100)).toFixed(2);
      }

      let salePrice = originalPrice;

      if (saleAmount) {
        salePrice = calculateSalePrice(originalPrice, saleAmount);
      }

      modalContent.productDetails = product; // Store product details in the modal content

      // Check and set default image source if necessary
      setDefaultImageSource(product);
      modalContent.innerHTML = `
      <div class="flex justify-content-space-between width-available modal-header">
      <div class="flex center flex-end " onclick="productDetails('${productId}')">
        <button style="margin: 0px ;border-radius: 8px 0px 8px 0px" type="button" class="Add-to-Cart" id="perv4Button">
        <i class="bi bi-box-arrow-in-down-right"></i>
        </button>
    </div>
    <div class="flex center flex-end" onclick="closeModal()">
        <button style="margin: 0px ;border-radius: 0px 8px 0px 8px" type="button" class="Add-to-Cart" id="perv4Button">
            <i class="bi bi-x-lg"></i>
        </button>
    </div>
    
    </div>
    <h5 class="m-5 pointer" id="BrandName" onclick="brand('${
      product["Brand-Name"]
    }')">${product["Brand-Name"]}</h5>
     <h2 class="m-5 pointer" onclick="productDetails('${productId}')" id="productTitle">${
        product["product-title"]
      }</h2>
    ${
      saleAmount
        ? `<del id="preprice" class="m-5 mb-10">${originalPrice}</del>`
        : ""
    }
    <div class="m-5 flex align-items">
        <p id="productPrice">${salePrice} EGP</p>
    </div>
        <div class="content-photo-container">
          <button id="previous-button" class="previous-button none-op" onclick="previousImage()">
            <i class="bi bi-arrow-left-short arrow"></i>
          </button>
          <img id="productImage" class="m-5 product-image active" src="${
            product["product-photo"]
          }" alt="Product Image">
          <img id="productImage2" class="m-5 product-image" src="${
            product["product-photo2"]
          }" alt="Product Image">
          <img id="productImage3" class="m-5 product-image" src="${
            product["product-photo3"]
          }" alt="Product Image3">
          <img id="productImage4" class="m-5 product-image" src="${
            product["product-photo4"]
          }" alt="Product Image4">
          <img id="productImage5" class="m-5 product-image" src="${
            product["product-photo5"]
          }" alt="Product Image5">
          <img id="productImage6" class="m-5 product-image" src="${
            product["product-photo6"]
          }" alt="Product Image6">
          <button id="next-button" class="next-button none-op" onclick="nextImage()">
            <i class="bi bi-arrow-right-short arrow"></i>
          </button>
        </div>
        
      
        <div class="size m-5"><h3 class="m-5 flex pb-7 center align-items">Size: <p id="product-Size"></p></h3><div id="size-hint-text" style="display: none; font-size: 16px; color: #333; margin-top: 10px;"></div></div>
        <ul class="m-5 flex">${Object.keys(product.sizes)
          .map(
            (size) =>
              `<div class="size-radio m-5" onclick="SizeRef('${size}')"><label class="radio-input_option"><span class="size-value">${size}</span></label></div>`
          )
          .join("")}</ul>
        <div class="size m-5"><h3 class="m-5 flex pb-7 center align-items">Color: <p id="product-color"></p></h3><div id="color-hint-text" style="display: none; font-size: 16px; color: #333; margin-top: 10px;"></div></div>
        
        <ul id="product-colors" class="m-5 flex flex-wrap hidden"></ul>
        <div class="m-5 flex align-items">
         SKU:<p id="productID"> ${productId}</p> 
        </div>
        <div class="m-5">
          <button id="addToCartButton" onclick="addToCart()" class="Add-to-Cart" disabled style="opacity: 0.5;">Add to Cart <i class="bi bi-exclamation-lg"></i></button>
        </div>
      `;

      // const modal = document.querySelector(".modal");
      // modal.style.display = "flex";
      const modal = document.querySelector(".modal");
      document.body.style.overflow = "hidden"; // Hide body overflow
      modal.classList.add("show"); // Show modal with animation
      // Close modal if clicking outside of the modal content
      modal.addEventListener("click", function (event) {
        if (!modalContent.contains(event.target)) {
          closeModal();
        }
      });
      // Clear size and color, then update the cart button state
      document.getElementById("product-Size").innerText = ""; // Clear size
      document.getElementById("product-color").innerText = ""; // Clear color
      updateAddToCartButtonState(); // Update button state
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
    });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  document.body.style.overflow = "auto"; // Restore body overflow
  modal.classList.remove("show"); // Hide modal with animation
}

function colorRef(color) {
  const modalContent = document.querySelector(".modal-content");
  const product = modalContent.productDetails;
  const size = document.getElementById("product-Size").innerText;

  const choosedColor = document.getElementById("product-color");
  choosedColor.innerText = color;

  // Update the images for the selected color
  if (product.sizes[size] && product.sizes[size][color]) {
    const colorDetails = product.sizes[size][color];

    document.getElementById("productImage").src = colorDetails.img1;
    document.getElementById("productImage2").src = colorDetails.img2;
    document.getElementById("productImage3").src = colorDetails.img3;
    document.getElementById("productImage4").src = colorDetails.img4;
    document.getElementById("productImage5").src = colorDetails.img5;
    document.getElementById("productImage6").src = colorDetails.img6;
  }

  // Highlight the selected color
  const colorOptions = document.querySelectorAll(".color-option");
  colorOptions.forEach((option) => {
    option.style.borderBottom =
      option.dataset.colorName === color ? "5px solid #c1c1c1" : "none";
    replaceInvalidImages();
  });

  updateAddToCartButtonState();
}

// Call the function after the images are loaded into the DOM

function SizeRef(size) {
  const modalContent = document.querySelector(".modal-content");
  const product = modalContent.productDetails;
  const choosedSize = document.getElementById("product-Size");
  const choosedColor = document.getElementById("product-color");

  // Clear the color when size changes
  choosedColor.innerText = "";
  choosedSize.innerText = size;

  // Update size buttons' styles
  const sizeButtons = document.querySelectorAll(".size-radio");
  sizeButtons.forEach((button) => {
    button.style.backgroundColor =
      button.textContent.trim() === size ? "#333" : "";
    button.style.color = button.textContent.trim() === size ? "#fff" : "#000";
  });

  // Display available colors for the selected size
  const colorsForSize = product.sizes[size];
  const colorList = modalContent.querySelector("#product-colors");
  colorList.innerHTML = Object.keys(colorsForSize)
    .map(
      (color) =>
        `<div class="color-option" data-color-name="${color}" style="background-color: ${colorsForSize[color]["color-value"]}" onclick="colorRef('${color}')"></div>`
    )
    .join("");
  colorList.classList.remove("hidden");

  updateAddToCartButtonState();
}

function updateAddToCartButtonState() {
  const size = document.getElementById("product-Size").innerText.trim(); // Get the selected size
  const color = document.getElementById("product-color").innerText.trim(); // Get the selected color
  const addToCartButton = document.getElementById("addToCartButton");
  const sizeHintTextElement = document.getElementById("size-hint-text");
  const colorHintTextElement = document.getElementById("color-hint-text");

  // Handle size hint
  if (!size) {
    if (sizeHintTextElement) {
      sizeHintTextElement.innerText = "Must choose a size!";
      sizeHintTextElement.style.display = "block";
      sizeHintTextElement.classList.add("rolling-animation");

      // Add underline animation
    }

    // Disable "Add to Cart" button
    addToCartButton.disabled = true;
    addToCartButton.style.opacity = 0.5;
    addToCartButton.innerHTML =
      'Add to Cart <i class="bi bi-exclamation-lg"></i>';
    addToCartButton.onclick = null;
    return;
  }

  // Hide size hint if size is selected
  if (sizeHintTextElement) {
    sizeHintTextElement.style.display = "none";
    sizeHintTextElement.classList.remove("rolling-animation");
    sizeHintTextElement.innerHTML = ""; // Clear dynamically added underline
  }

  // Handle color hint
  if (!color) {
    if (colorHintTextElement) {
      colorHintTextElement.innerText = "Must choose a color!";
      colorHintTextElement.style.display = "block";
      colorHintTextElement.classList.add("rolling-animation");

      // Add underline animation
    }

    // Disable "Add to Cart" button
    addToCartButton.disabled = true;
    addToCartButton.style.opacity = 0.5;
    addToCartButton.innerHTML =
      'Add to Cart <i class="bi bi-exclamation-lg"></i>';
    addToCartButton.onclick = null;
    return;
  }

  // Hide color hint if color is selected
  if (colorHintTextElement) {
    colorHintTextElement.style.display = "none";
    colorHintTextElement.classList.remove("rolling-animation");
    colorHintTextElement.innerHTML = ""; // Clear dynamically added underline
  }

  // Enable "Add to Cart" button when both size and color are selected
  addToCartButton.disabled = false;
  addToCartButton.style.opacity = 1;
  addToCartButton.innerHTML = 'Add to Cart <i class="bi bi-bag-check"></i>';
  addToCartButton.onclick = addToCart;
}

let currentIndex = 0;

// Array of image element IDs
const imageIds = [
  "productImage",
  "productImage2",
  "productImage3",
  "productImage4",
  "productImage5",
  "productImage6",
];

// Function to show the previous image
function previousImage() {
  // Get the current image element and remove the "active" class
  document.getElementById(imageIds[currentIndex]).classList.remove("active");

  // Decrement the index (wrap around if needed)
  currentIndex = (currentIndex - 1 + imageIds.length) % imageIds.length;

  // Add the "active" class to the new current image
  document.getElementById(imageIds[currentIndex]).classList.add("active");
}

// Function to show the next image
function nextImage() {
  // Get the current image element and remove the "active" class
  document.getElementById(imageIds[currentIndex]).classList.remove("active");

  // Increment the index (wrap around if needed)
  currentIndex = (currentIndex + 1) % imageIds.length;

  // Add the "active" class to the new current image
  document.getElementById(imageIds[currentIndex]).classList.add("active");
}

//
function replaceInvalidImages() {
  // Select all <img> elements inside the container
  const images = document.querySelectorAll(".content-photo-container img");

  images.forEach((img) => {
    const src = img.getAttribute("src");
    // Check if the src is empty, "undefined", or null
    if (!src || src === "undefined" || src.trim() === "") {
      // Assign the placeholder image URL
      img.src =
        "https://i.imgur.com/gLKw3OD_d.webp?maxwidth=760&fidelity=grand";
    }
  });
}
// Call the function after the images are loaded into the DOM
replaceInvalidImages();
