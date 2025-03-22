// Function to update the cart count and cart amount
function updateCartCount() {
  // Retrieve cart data from local storage
  let cart = JSON.parse(localStorage.getItem("cart"));

  // Get references to the cart count and cart amount elements
  let cartItemCount = document.getElementById("cartItemCount");
  const cartAmountElement = document.getElementById("cart-amount");

  // Check if the cart data exists
  if (cart && cart.length > 0) {
    // Initialize total price and total quantity
    let totalPrice = 0;
    let totalQuantity = 0;

    // Iterate through cart items to calculate total price and quantity
    cart.forEach((item) => {
      // Extract the numeric value from the price string and convert it to a number
      let price = parseFloat(item.price.replace(" EGP", ""));
      totalPrice += price * item.quantity; // Multiply price by quantity
      totalQuantity += item.quantity; // Sum up the quantities
    });

    // Update the cart count with the total quantity
    cartItemCount.textContent = totalQuantity;

    // Update the cart amount element with the total price
    cartAmountElement.innerText = `${totalPrice.toFixed(2)} EGP`;
  } else {
    // If the cart is empty or null, set the cart count to 0 and total price to 0
    cartItemCount.textContent = "0";
    cartAmountElement.innerText = `0.00 EGP`;
  }
}

// Call the function initially to update the cart count and amount
updateCartCount();

// Listen for changes in the local storage (e.g., when items are added or removed from the cart)
window.addEventListener("storage", function (event) {
  // Update the cart count and amount whenever there is a change in the local storage
  updateCartCount();
});

// Call the function to update the cart amount on page load
window.addEventListener("load", updateCartCount);
