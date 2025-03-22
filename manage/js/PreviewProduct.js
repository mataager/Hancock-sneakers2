// document.getElementById("previewButton").addEventListener("click", function () {
//   // Get modal and show it
//   const modal = document.getElementById("productModal");
//   modal.classList.add("show");

//   // Fetch form values
//   const brandName = document.getElementById("brandname").value;
//   const productTitle = document.getElementById("producttitle").value;
//   const originalPrice = document.getElementById("productprice").value;
//   const saleAmount = document.getElementById("sale-amount").value;
//   const finalPrice = document.getElementById("Storeprice").value;
//   const category = document.getElementById("category").value;
//   const piece = document.getElementById("piece").value;
//   const details = document.getElementById("product-details").value;
//   const size = document.getElementById("size-chart").value;
//   const color = document.getElementById("product-color").textContent;

//   if (!saleAmount) {
//     document.getElementById("preprice").classList.add("hidden");
//   }

//   // Update modal content
//   document.getElementById("BrandName").textContent = brandName;
//   document.getElementById("productTitle").textContent = productTitle;
//   document.getElementById(
//     "preprice"
//   ).innerHTML = `<del class="pre-sale">${originalPrice} EGP</del>`;
//   document.getElementById("productPrice").textContent = `${finalPrice} EGP`;

//   document.getElementById("piece").textContent = piece;
//   document.getElementById("product-details").textContent = details;
//   document.getElementById("product-Size").textContent = size;
//   document.getElementById("product-color").textContent = color;

//   // Close modal function
//   window.closeModal = function () {
//     modal.classList.remove("show");
//   };

//   // Close modal when clicking outside content
//   window.onclick = function (event) {
//     if (event.target == modal) {
//       closeModal();
//     }
//   };
// });
