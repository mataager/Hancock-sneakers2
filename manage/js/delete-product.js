

async function searchProductdel() {
  const spinner = document.getElementById("sub-spin-del");
  const searchicon = document.getElementById("sub-txt-del");
  const message = document.getElementById("warning-del");
  const deleteDiv = document.getElementById("deleteitem-details");
  const productId = document
    .getElementById("product-id-input-del")
    .value.trim();

  // Show the spinner
  spinner.classList.remove("hidden");
  searchicon.classList.add("hidden");

  if (!productId) {
    Swal.fire({
      text: "Please enter a product ID",
      icon: "info",
      timer: 1500,
      showConfirmButton: false,
    }).then(() => {
      // Hide the spinner after showing the warning
      spinner.classList.add("hidden");
      searchicon.classList.remove("hidden");
      deleteDiv.classList.add("hidden");
    });

    return;
  }

  try {
    const response = await fetch(
      `${url}/Stores/${uid}/Products/${productId}.json`
    );
    const data = await response.json();

    if (!data) {
      Swal.fire({
        text: "Product not found",
        icon: "info",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        // Hide the spinner after showing the info
        spinner.classList.add("hidden");
        searchicon.classList.remove("hidden");
        deleteDiv.classList.add("hidden");
      });

      return;
    }

    // Fill the form with the fetched data
    document.getElementById("producttitle-del").value =
      data["product-title"] || "";
    document.getElementById("brandname-del").value = data["Brand-Name"] || "";
    document.getElementById("productprice-del").value =
      data["Product-Price"] || "";
    document.getElementById("sale-amount-del").value =
      data["sale-amount"] || "";
    document.getElementById("category-del").value = data["category"] || "";
    document.getElementById("Type-del").value = data["type"] || "";
    document.getElementById("Piece-del").value = data["piece"] || "";
    document.getElementById("productdescription-del").value =
      data["product-description"] || "";

    document.getElementById("mainimg1-del").src =
      data["product-photo"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
    document.getElementById("mainimg2-del").src =
      data["product-photo2"] ||
      "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
      document.getElementById("mainimg3-del").src =
        data["product-photo3"] ||
        "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
      document.getElementById("mainimg4-del").src =
        data["product-photo4"] ||
        "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
        document.getElementById("mainimg6-del").src =
          data["product-photo6"] ||
          "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
          document.getElementById("mainimg5-del").src =
            data["product-photo5"] ||
            "https://i.imgur.com/Ob91UIr_d.webp?maxwidth=760&fidelity=grand";
        

    calculateFinalPrice3();

    const container = document.getElementById("input-container-del");
    container.innerHTML = ""; // Clear previous entries

    const sizes = data["sizes"];
    let count = 0;
    for (const size in sizes) {
      for (const color in sizes[size]) {
        count++;
        const product = sizes[size][color];

        const newDiv = document.createElement("div");
        newDiv.classList.add(
          "flex",
          "center",
          "input-set",
          "mb-3",
          "flex-wrap",
          "mb-30",
          "add-product-cart",
          "product-record",
          "shadow"
        );
        newDiv.id = `p${count}`;

        newDiv.innerHTML = `
                    <div class="product-data" id="product-data">
                        <div class="flex mb-3">
                            <input type="text" name="size" placeholder="Size" class="formbold-form-input m-LR-2" value="${size}" disabled>
                            <input type="text" name="quantity" placeholder="Quantity" class="formbold-form-input m-LR-2" value="${product.qty}" disabled>
                        </div>
                        <div class="flex flex-wrap mb-3">
                            <input type="text" name="product-photo" placeholder="pic Url 1" class="formbold-form-input m-LR-2" value="${product.img1}" disabled>
                            <input type="text" name="product-photo2" placeholder="pic Url 2" class="formbold-form-input m-LR-2" value="${product.img2}" disabled>
                            <input type="text" name="product-photo3" placeholder="pic Url 3" class="formbold-form-input m-LR-2" value="${product.img3}" disabled>
                            <input type="text" name="product-photo4" placeholder="pic Url 4" class="formbold-form-input m-LR-2" value="${product.img4}" disabled>
                            <input type="text" name="product-photo5" placeholder="pic Url 5" class="formbold-form-input m-LR-2" value="${product.img5}" disabled>
                            <input type="text" name="product-photo6" placeholder="pic Url 6" class="formbold-form-input m-LR-2" value="${product.img6}" disabled>
                        </div>
                        <div class="flex flex-wrap center mb-3">
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg1_p${count}" src="${product.img1}">
                                                </div>
                                                
                                            </div>
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg2_p${count}" src="${product.img2}" >
                                                </div>
                                               
                                            </div>
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg3_p${count}" src="${product.img3}">
                                                </div>
                                                
                                            </div>
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg4_p${count}" src="${product.img4}" >
                                                </div>
                                               
                                            </div>
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg5_p${count}" src="${product.img5}">
                                                </div>
                                                
                                            </div>
                                            <div class="flex flex-column align-items" >
                                                <div class="drop-zone">
                                                    <img id="editimg6_p${count}" src="${product.img6}" >
                                                </div>
                                               
                                            </div>
                                        </div>
                        <div class="flex center mb-3">
                            <div class="color-input-wrapper m-LR-2">
                                <div class="flex center align-items">
                                    <input type="text" name="color" class="formbold-form-input" value="" disabled>
                                    <input type="color" name="color-value" class="color-picker" disabled>
                                </div>
                            </div>
                            <input type="text" name="color-name" style="width: 50%;" class="formbold-form-input m-LR-2" value="${color}" disabled>
                        </div>
                    </div>
                `;
        container.appendChild(newDiv);
      }
    }

    // Show the delete item details
    deleteDiv.classList.remove("hidden");
    spinner.classList.add("hidden");
    searchicon.classList.remove("hidden");
  } catch (error) {
    Swal.fire({
      text: "Error fetching product",
      icon: "Error",
      timer: 1500,
      showConfirmButton: false,
    });
    deleteDiv.classList.remove("hidden");
  }
}

//handling price after sale
const productPriceInput3 = document.getElementById("productprice-del");
const saleAmountInput3 = document.getElementById("sale-amount-del");
const finalPriceInput3 = document.getElementById("finalprice-del");

function calculateFinalPrice3() {
  const productPrice3 = parseFloat(productPriceInput3.value) || 0;
  const saleAmount3 = parseFloat(saleAmountInput3.value) || 0;

  const discount = productPrice3 * (saleAmount3 / 100);
  const finalPrice3 = productPrice3 - discount;

  finalPriceInput3.value = finalPrice3.toFixed(2);
}

productPriceInput3.addEventListener("input", calculateFinalPrice3);
saleAmountInput3.addEventListener("input", calculateFinalPrice3);
//

async function deleteProduct() {
  const productId = document
    .getElementById("product-id-input-del")
    .value.trim();
  if (!productId) {
    Swal.fire({
      text: "Please enter a product ID",
      icon: "error",
      timer: 1500,
      showConfirmButton: false,
    });
    document.getElementById("deleteitem-details").classList.remove("hidden");
    return;
  }

  Swal.fire({
    title: "Are you sure?",
    text: "Do you want to delete this product?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      // Check if the user is authenticated
      const user = firebase.auth().currentUser; // Get the current user
      if (!user) {
        Swal.fire({
          title: "Authentication Required!",
          text: "You need to be signed in to delete a product.",
          icon: "warning",
          confirmButtonText: "Okay",
          customClass: {
            container: "swal2-custom",
            title: "swal2-custom",
          },
        });
        return; // Exit if the user is not authenticated
      }

      if (user) {
        try {
          const idToken = await user.getIdToken(); // Fetch ID token if needed

          const response = await fetch(
            `${url}/Stores/${uid}/Products/${productId}.json?auth=${idToken}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${idToken}`, // Ensure the token is passed if required
              },
            }
          );

          if (response.ok) {
            Swal.fire({
              title: "Deleted!",
              text: "",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            // Clear the form and hide the details section
            document.getElementById("delete-product-form").reset();
            document
              .getElementById("deleteitem-details")
              .classList.add("hidden");
          } else {
            Swal.fire({
              title: "Error",
              text: "Failed to delete the product",
              icon: "error",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Error deleting product:", error);
          Swal.fire("Error", "Error deleting product", "error");
        }
      }
    }
  });
}

