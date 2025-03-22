document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalAmount = 0;

  // Function to check availability from Firebase and adjust quantity if needed
  async function checkAndAdjustCartItems() {
    const adjustedItems = [];

    for (const item of cart) {
      const { id, productSize, productColor, quantity } = item;

      const updatedQuantity = await new Promise((resolve) => {
        checkAvailability(
          id,
          productSize,
          productColor,
          quantity,
          (_, validQuantity) => resolve(validQuantity)
        );
      });

      if (updatedQuantity < quantity) {
        // If quantity is adjusted, update the cart item and add to adjustedItems
        adjustedItems.push({
          ...item,
          adjustedQuantity: updatedQuantity,
        });
        item.quantity = updatedQuantity; // Adjust the quantity
      }
    }

    // Update local storage with the adjusted cart
    localStorage.setItem("cart", JSON.stringify(cart));

    return adjustedItems;
  }

  // Function to check availability from Firebase database
  function checkAvailability(
    itemId,
    productSize,
    productColor,
    requestedQuantity,
    callback
  ) {
    fetch(`${url}/Stores/${uid}/Products/${itemId}.json`)
      .then((response) => response.json())
      .then((productsData) => {
        if (
          productsData &&
          productsData.sizes &&
          productsData.sizes[productSize] &&
          productsData.sizes[productSize][productColor]
        ) {
          const availableQty = parseInt(
            productsData.sizes[productSize][productColor].qty,
            10
          );
          let validQuantity = requestedQuantity;

          if (requestedQuantity > availableQty) {
            validQuantity = availableQty; // Adjust to available stock
          }

          callback(true, validQuantity); // Call the callback with valid quantity
        } else {
          callback(false, 0); // Item not found or unavailable
        }
      })
      .catch((error) => {
        console.error("Error checking availability:", error);
        callback(false, 0); // Error
      });
  }

  // Populate cart items and handle adjustments
  async function populateCartItems() {
    const adjustedItems = await checkAndAdjustCartItems();

    // If there are adjustments, show them in Swal.fire
    if (adjustedItems.length > 0) {
      const adjustedHTML = adjustedItems
        .map(
          (item) => `
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
          <img 
            src="${item["photourl"]}" 
            style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;" 
          />
          <span> your item has adjusted to its maximum stock amount which is : ${item.adjustedQuantity}</span>
        </div>
      `
        )
        .join("");

      Swal.fire({
        icon: "warning",
        title: "Adjusted Quantities",
        html: adjustedHTML,
      }).then(() => {
        // Reload the page after the user clicks "OK"
        window.location.reload();
      });
    }

    // Update total amount
    updateTotalAmount();
  }

  // Function to update the total amount
  function updateTotalAmount() {
    totalAmount = cart.reduce(
      (acc, item) =>
        acc + parseFloat(item.price.replace(" EGP", "")) * item.quantity,
      0
    );
    const totalAmountDiv = document.getElementById("total-cart-amount");
    if (totalAmountDiv) {
      totalAmountDiv.innerText = `Total : ${totalAmount.toFixed(2)} EGP`;
    }
  }

  // Populate the cart items with adjustments
  populateCartItems();
});
