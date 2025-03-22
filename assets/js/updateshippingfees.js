function handleAddressClick(city, fullAddress, governorate) {
  // Save selected city to localStorage
  localStorage.setItem("City", city);
  // Save the full address to localStorage
  localStorage.setItem("Address", fullAddress);
  // Save the governorate to localStorage
  localStorage.setItem("Governorate", governorate);

  // Trigger the shipping logic
  updateShippingFees();

  // Highlight the clicked card and remove border from others
  highlightSelectedCard();
}

function highlightSelectedCard() {
  const addressCards = document.querySelectorAll(".address-card"); // Select all address cards

  // Remove the border from all other cards
  addressCards.forEach((card) => {
    card.style.border = ""; // Clear the border
  });

  // Add border to the clicked card
  const clickedCard = event.currentTarget;
  clickedCard.style.border = "2px solid #838383";
}

function updateShippingFees() {
  const shippingFeesElement = document.getElementById("shipping-fees"); // Get the shipping fees element
  const shippingFeesElementtotal = document.getElementById(
    "shipping-fees-total"
  );
  const cartTotalElement = document.getElementById("cart-total");
  const totalCartAmountElement = document.getElementById("total-cart-amount");
  const savedGovernorate = localStorage.getItem("Governorate"); // Retrieve the saved city from localStorage

  // Parse cart total and total cart amount
  const cartTotal = cartTotalElement
    ? parseFloat(cartTotalElement.innerText) || 0
    : 0;
  const totalCartAmount = totalCartAmountElement
    ? parseFloat(totalCartAmountElement.innerText) || 0
    : 0;

  // Check if free shipping threshold is met
  if (cartTotal > freeshipping || totalCartAmount > freeshipping) {
    if (shippingFeesElement) shippingFeesElement.innerText = "0 EGP";
    if (shippingFeesElementtotal)
      shippingFeesElementtotal.innerText = "Free Shipping";
    localStorage.setItem("shippingFees", "0");
    return; // Exit early since no further calculation is needed
  }

  // If free shipping is not applicable, use the old logic
  if (shippingFeesElement) {
    if (savedGovernorate) {
      if (
        [
          "Cairo",
          "Giza",
          "Alexandria",
          "Port Said",
          "Suez",
          "Damietta",
          "Fayoum",
          "Dakahlia",
          "Sharqia",
          "Qalyubia",
          "Kafr El Sheikh",
          "Gharbia",
          "Monufia",
          "Beheira",
          "Ismailia",
        ].includes(savedGovernorate)
      ) {
        shippingFeesElement.innerText = "85 EGP";
        shippingFeesElementtotal.innerText = "85 EGP";
        localStorage.setItem("shippingFees", "85");
      } else {
        shippingFeesElement.innerText = "100 EGP";
        shippingFeesElementtotal.innerText = "100 EGP";
        localStorage.setItem("shippingFees", "100");
      }
    } else {
      console.log("Saved City from localStorage:", savedGovernorate);
    }
  }
}

// Ensure this runs on DOM ready
document.addEventListener("DOMContentLoaded", function () {
  updateShippingFees(); // Ensure the initial logic sets up the UI
});

function calculateCartTotal(cartItems) {
  return cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace(" EGP", "").trim()) || 0;
    return total + price * item.quantity;
  }, 0);
}

// Function to dynamically calculate & append the shipping fees div
function appendShippingFeeDiv(city, cartItems) {
  const freeShippingThreshold = 200; // Free shipping threshold
  const cartTotal = calculateCartTotal(cartItems); // Calculate cart total dynamically

  let shippingFees = 100; // Default shipping fee
  if (["Cairo", "Giza", "Alexandria"].includes(city)) {
    shippingFees = 85; // Discounted shipping fee for specific cities
  }

  // Logic for free shipping based on cart amount
  if (cartTotal >= freeShippingThreshold) {
    shippingFees = 0; // Free shipping
  }

  // Update or create shipping fees container
  let shippingFeesContainer = document.getElementById(
    "shipping-fees-container"
  );
  if (!shippingFeesContainer) {
    shippingFeesContainer = document.createElement("div");
    shippingFeesContainer.id = "shipping-fees-container";
    document.body.appendChild(shippingFeesContainer);
  }

  // Clear and update content
  shippingFeesContainer.innerHTML = `
    <p>Cart Total: ${cartTotal.toFixed(2)} EGP</p>
    <p>Shipping Fees: ${shippingFees.toFixed(2)} EGP</p>
  `;

  console.log(`Cart Total: ${cartTotal.toFixed(2)} EGP`);
  console.log(`Shipping Fee: ${shippingFees.toFixed(2)} EGP`);
}
