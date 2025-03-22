// Function to fetch user data and render addresses dynamically

function updateCartSummary() {
  // Retrieve cart items from localStorage
  let cart = localStorage.getItem("cart");

  // Check if the cart is not empty
  if (cart) {
    // Parse the JSON string into an array
    cart = JSON.parse(cart);

    // Initialize total price
    let totalPrice = 0;

    // Iterate through cart items and sum up the prices
    cart.forEach((item) => {
      // Extract the numeric value from the price string and convert it to a number
      let price = parseFloat(item.price.replace(" EGP", "")); // Convert price to number
      let quantity = parseInt(item.quantity) || 1; // Get quantity, default to 1 if not available

      // Add the product of price and quantity to the total price
      totalPrice += price * quantity;
    });

    // Update the cart total element in the DOM
    document.getElementById("cart-total").innerText = `${totalPrice} EGP`;

    // Retrieve the shipping fees from the DOM and convert it to a number
    let shippingFees =
      parseFloat(document.getElementById("shipping-fees-total").innerText) || 0;

    // Calculate the final price (cart total + shipping fees)
    let finalPrice = totalPrice + shippingFees;

    // Update the total price element in the DOM
    document.getElementById("total-price").innerText = `${finalPrice} EGP`;
  } else {
    // If no cart exists, reset the totals
    document.getElementById("cart-total").innerText = "0 EGP";
    document.getElementById("total-price").innerText = "0 EGP";
  }
}

// Trigger the function automatically on page load
document.addEventListener("DOMContentLoaded", updateCartSummary);

// Monitor changes to the localStorage (for automatic updates)
window.addEventListener("storage", (event) => {
  if (event.key === "cart") {
    updateCartSummary();
  }
});

function observeShippingFees() {
  const shippingFeesElement = document.getElementById("shipping-fees-total");
  const observer = new MutationObserver(updateCartSummary);

  // Observe changes to the text content of the shipping fees element
  observer.observe(shippingFeesElement, {
    childList: true,
    characterData: true,
    subtree: true,
  });
}

// Call the function to update the shipping fees on page load
window.onload = function () {
  updateShippingFees();
  observeShippingFees();
};

function showMoreShippingData() {
  const shippingInfo = document.getElementById("shippingInfo");
  const addToCartButton = document.getElementById("shiptxtinfo");
  const icon = document.getElementById("shippininfoicon");
  icon.classList = "";

  if (shippingInfo) {
    if (shippingInfo.classList.contains("hidden")) {
      shippingInfo.classList.remove("hidden");
      addToCartButton.innerHTML = "Hide Shipping Info";
      icon.classList = "bi bi-dash";
    } else {
      shippingInfo.classList.add("hidden");
      addToCartButton.innerHTML = "Show More Info";
      icon.classList = "bi bi-plus";
    }
  }
}
// function fetchUserAddressAndRender() {
//   // Ensure the user is authenticated
//   firebase.auth().onAuthStateChanged(async (user) => {
//     if (user) {
//       try {
//         // Get the user's ID token for secure database access
//         const idToken = await user.getIdToken();

//         // URL to the user's data
//         const url = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${user.uid}.json?auth=${idToken}`;

//         // Fetch user data
//         const response = await fetch(url);
//         if (!response.ok) throw new Error("Failed to fetch user data.");

//         const userData = await response.json();

//         // Render addresses in the provided div
//         if (userData && userData.address) {
//           renderAddresses(userData.address);
//         }
//       } catch (error) {
//         console.error("Error fetching user address:", error);
//         Swal.fire({
//           icon: "error",
//           title: "Error",
//           text: "Could not load your address data.",
//         });
//       }
//     } else {
//     }
//   });
// }
function fetchUserAddressAndRender() {
  // Ensure the user is authenticated
  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      try {
        // Get the user's ID token for secure database access
        const idToken = await user.getIdToken();

        // URL to the user's data
        const url = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${user.uid}.json?auth=${idToken}`;

        // Fetch user data
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch user data.");

        const userData = await response.json();

        // Render addresses in the provided div
        if (userData && userData.address) {
          renderAddresses(userData.address);
        } else {
          renderNoAddressesMessage();
        }
      } catch (error) {
        console.error("Error fetching user address:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Could not load your address data.",
        });
      }
    } else {
      document.getElementById("address-sec").classList.add("hidden");
    }
  });
}
function renderAddresses(addresses) {
  const preloader = document.getElementById("preloader2");
  preloader.classList.add("hidden");
  const container = document.getElementById("address-area");
  container.innerHTML = ""; // Clear existing content

  let firstAddressCity = null; // To capture the first address's city
  let firstAddress = null; // To capture the first address details

  Object.values(addresses).forEach((address, index) => {
    const div = document.createElement("div");
    div.classList.add("account-section", "address-card");
    div.setAttribute(
      "onclick",
      `handleAddressClick('${address.city}','${address.fullAddress}','${address.governorate}', this)`
    );

    // Apply special styling to the first card
    if (index === 0) {
      div.style.border = "2px solid rgb(131, 131, 131)";
      governorate = address.governorate;
      firstAddressCity = address.city;
      firstAddress = address.fullAddress; // Store the first address
    }

    div.innerHTML = `
    <button class="toggle-btn" onclick="toggleAddress(this, event)">
    <p>show more</p>
      <i class="fa-regular fa-circle-right"></i>
    </button>
      <div class="details-row">
        <div class="detail-group">
          <h6>Governorate</h6>
          <p>${address.governorate}</p>
        </div>
        <div class="detail-group">
          <h6>City/State</h6>
          <p>${address.city}</p>
        </div>
      </div>
      <div class="details-row">
        <div class="detail-group">
          <h6>Area</h6>
          <p>${address.area}</p>
        </div>
        <div class="detail-group">
          <h6>House-Number</h6>
          <p>${address.houseNumber}</p>
        </div>
      </div>
      <div class="details-row">
        <div class="detail-group">
          <h6>Full Address</h6>
          <p>${address.fullAddress}</p>
        </div>
      </div>
    `;

    container.appendChild(div);
  });

  // Store the first address city and full address in localStorage if they exist
  if (firstAddressCity && firstAddress && governorate) {
    localStorage.setItem("Governorate", governorate);
    localStorage.setItem("City", firstAddressCity);
    localStorage.setItem("Payment", "COD");
    // localStorage.setItem("Address", JSON.stringify(firstAddress));
    localStorage.setItem("Address", firstAddress);
    updateShippingFees();
  }
}
function toggleAddress(button, event) {
  // Prevent parent card's click event
  event.stopPropagation();

  const addressCard = button.closest(".address-card");

  if (!addressCard.classList.contains("expanded")) {
    // Expand the card
    const fullHeight = addressCard.scrollHeight; // Get the full height of the content
    addressCard.style.height = `${fullHeight}px`; // Set the height explicitly
    addressCard.classList.add("expanded");
    button.innerHTML = '<p>Hide</p><i class="fa-regular fa-circle-down"></i>';
  } else {
    // Collapse the card
    addressCard.style.height = "85px"; // Set the height to collapsed value
    addressCard.classList.remove("expanded");
    button.innerHTML =
      '<p>Show More</p><i class="fa-regular fa-circle-right"></i>';
  }
}

function renderNoAddressesMessage() {
  // Show the preloader
  const preloader = document.getElementById("preloader2");

  preloader.classList.remove("hidden");

  const container = document.getElementById("address-area");

  const submitbtn = document.getElementById("Submit");

  // Remove the 'onclick' attribute
  submitbtn.removeAttribute("onclick");

  // Clear the button text
  submitbtn.innerText = "";

  // Set new button text
  submitbtn.innerText = "Must add address first !";
  // Add click event to redirect to ./account
  submitbtn.addEventListener("click", () => {
    window.location.href = "./account.html";
  });

  // Clear existing content
  container.innerHTML = "";

  // Simulate a delay (remove this if no actual delay is needed)
  setTimeout(() => {
    // Create the no address message
    const noAddressDiv = document.createElement("div");
    noAddressDiv.classList.add("no-address-message");

    noAddressDiv.innerHTML = `
    <i class="bi bi-geo-alt-fill"></i>
      <h5 class="elegant-message">No address found</h5>
      <p>
        Please <a href="./account.html" class="link-to-add">add an address</a> to submit your order.
      </p>
    `;

    // Append the no address message to the container
    container.appendChild(noAddressDiv);

    // Hide the preloader after a short delay (to make sure the message is visible)
    setTimeout(() => {
      preloader.classList.add("hidden");
    }, 200); // Short delay to ensure the message is shown
  }, 1000); // Simulate the delay (adjust as needed)
}

document.addEventListener("DOMContentLoaded", function () {
  const shippingFeesElement = document.getElementById("shipping-fees"); // Get the shipping fees element

  if (shippingFeesElement) {
    const savedCity = localStorage.getItem("City"); // Get the city from local storage

    if (savedCity) {
      if (
        savedCity === "Cairo" ||
        savedCity === "Giza" ||
        savedCity === "Alexandria"
      ) {
        shippingFeesElement.innerText = "65 EGP";
        localStorage.setItem("shippingFees", "65");
      } else {
        shippingFeesElement.innerText = "100 EGP";
        localStorage.setItem("shippingFees", "100");
      }
    } else {
      // Default if no city is selected
      shippingFeesElement.innerText = "100 EGP";
      localStorage.setItem("shippingFees", "100");
    }
  }
});

// Call the function when the DOM is ready
document.addEventListener("DOMContentLoaded", fetchUserAddressAndRender);

// Function to check if Free Shipping is applied
function checkFreeShipping() {
  const shippingFeesElementTotal = document.getElementById(
    "shipping-fees-total"
  );

  if (
    shippingFeesElementTotal &&
    shippingFeesElementTotal.innerText.trim() === "Free Shipping"
  ) {
    Swal.fire({
      title: "Yeah! You Got Free Shipping!",
      text: "Enjoy your order with no extra shipping fees.",
      imageUrl: "your-free-shipping-image.jpg", // Replace with your actual image URL
      imageWidth: 200,
      imageHeight: 200,
      imageAlt: "Free Shipping",
      confirmButtonText: "Awesome!",
    });
  }
}

// Run the function on page load
document.addEventListener("DOMContentLoaded", checkFreeShipping);

//
