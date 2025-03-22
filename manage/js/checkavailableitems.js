async function checkavailableitems(user) {
  try {
    // Show spinner and hide stock info initially
    document
      .querySelectorAll(".spinner-sm-available-items")
      .forEach((spinner) => spinner.classList.remove("hidden"));
    document.getElementById("stockCount").classList.add("hidden");
    document.getElementById("progress-bar-area").classList.add("hidden");

    // Get the ID token
    const idToken = await user.getIdToken();
    const uid = user.uid; // Get the user's UID

    // Construct the URL with the user's UID
    const url = `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/Products.json?auth=${idToken}`;

    // Fetch the product data
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${idToken}` }, // Send token for authentication
    });

    // Ensure at least 2.5 seconds of spinner time
    await new Promise((resolve) => setTimeout(resolve, 2500));

    if (!response.ok) {
      throw new Error("Failed to fetch product data.");
    }

    const data = await response.json();

    // Calculate product count and available stock
    productCount = data ? Object.keys(data).length : 0;
    availableStock = maxStock - productCount;

    console.log(
      `Total products: ${productCount}, Available stock: ${availableStock}`
    );

    // Update UI
    updateStockUI();
  } catch (error) {
    console.error("Error fetching available items:", error);
  }
}

function updateStockUI() {
  const progressBar = document.getElementById("progressBar");
  const availableStockText = document.getElementById("available-items-stock");
  const totalProductText = document.getElementById("total-products-count");
  const progressBarArea = document.getElementById("progress-bar-area");

  // Hide spinner and show stock info

  document
    .querySelectorAll(".spinner-sm")
    .forEach((spinner) => spinner.classList.add("hidden"));
  document.getElementById("stockCount").classList.remove("hidden");
  document.getElementById("progress-bar-area").classList.remove("hidden");
  setTimeout(() => {
    progressBarArea.classList.add("show"); // Add class after a delay
  }, 100); // Small delay before applying the show class

  // Update available stock and total products
  availableStockText.textContent = availableStock;
  totalProductText.textContent = productCount;

  // Calculate percentage used and update progress bar
  const usedPercentage = ((maxStock - availableStock) / maxStock) * 100;
  progressBar.style.width = usedPercentage + "%";
}

// Decrease available stock when "Sell Item" button is clicked
function decreaseStock() {
  if (availableStock > 0) {
    availableStock--; // Reduce stock
    productCount++; // Increase total products
    updateStockUI(); // Update UI
  } else {
    alert("No stock left!");
  }
}
