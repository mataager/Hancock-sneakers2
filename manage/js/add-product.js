document.getElementById("add-more").addEventListener("click", function () {
  const icon = document.getElementById("add-more-rotate");
  icon.classList.add("rotate-icon");

  // Remove the class after the animation completes to allow re-adding on next click
  icon.addEventListener("animationend", () => {
    icon.classList.remove("rotate-icon");
  });

  let count = document.querySelectorAll(".input-set").length + 1;
  const inputContainer = document.getElementById("input-container");

  const newInputSet = document.createElement("div");
  newInputSet.classList.add(
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
  newInputSet.id = `p${count}`;

  newInputSet.innerHTML = `
    <div class="i-div align-items mb-10i">
      <button type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-expand cus-btn">
        <i class="bi bi-arrows-angle-contract"></i>
        <i class="bi bi-arrows-angle-expand none"></i>
      </button>
      <button title="duplicate this item" type="button" style="border: none; margin-left:5px;margin-bottom:0px;" class="formbold-form-label point toggle-duplicate cus-btn">
        <i class="bi bi-copy"></i>
      </button>
      <button type="button" style="border: none; margin-left:auto" class="point no-bg-i toggle-delete ml-auto cus-btn">
        <i class="bi bi-x-lg"></i>
      </button>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="Quantity">Qty:</h5>
        <h5 class="none" id="QuantityValue"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <h5 class="none mr-3" id="size">Size:</h5>
        <h5 class="none" id="sizevalue"></h5>
      </div>
      <div class="flex center align-items ml-auto">
        <label class="circle none mr-3" id="Colorcircle"></label>
        <h5 class="none color-value" id="colorvalue"></h5>
      </div>
    </div>
    <div class="product-data" style="max-height: 1300px; opacity: 1; padding: 10px 0px;"  id="product-data">
      <div class="flex mb-10 minline-140 p5 center align-items gap-10 align-flex-start-SQ">

<div class="input-group flex column">
    <label class="font-sm m510" for="size${count}">Size</label>
    <div class="input-with-buttons column">
        <input id="size${count}" type="text" name="size" placeholder="Size" class="formbold-form-input m-LR-2 max-150 " value="0">
        <div class="flex gap-20 mt-20">
        <button type="button" class="decrement-btn" onclick="decrement('size${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('size${count}')"><i class="bi bi-plus-circle"></i></button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicatePlus('size${count}')">
            <i class="bi bi-chevron-double-down"></i>
        </button>
        <button type="button" class="duplicatePlus-btn" onclick="duplicateInRange('size${count}')">
            <i class="bi bi-collection"></i>
        </button>
        </div>
    </div>
</div>

<div class="input-group flex column">
    <label class="font-sm m510" for="quantity${count}">Quantity</label>
    <div class="input-with-buttons">
        <input id="quantity${count}" type="text" name="quantity" placeholder="Quantity" class="formbold-form-input m-LR-2 max-200" value="3">
         <div class="flex column gap-10">
        <button type="button" class="decrement-btn" onclick="decrement('quantity${count}')"><i class="bi bi-dash-circle"></i></button>
        <button type="button" class="increment-btn" onclick="increment('quantity${count}')"><i class="bi bi-plus-circle"></i></button>
        </div>
    </div>
</div>
      </div>
      <div class="flex center">
      <button type="button" class="show-img-url" onclick="toggleImageInputs(${count})">Show Images Urls <i class="bi bi-eye-fill"></i></button>
      </div>
      <div class="flex flex-wrap mb-3 imgids" id="image-inputs-${count}">
        <input type="text" id="img1_${count}" name="product-photo" placeholder="pic url 1" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img2_${count}" name="product-photo2" placeholder="pic url 2" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img3_${count}" name="product-photo3" placeholder="pic url 3" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img4_${count}" name="product-photo4" placeholder="pic url 4" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img5_${count}" name="product-photo5" placeholder="pic url 5" class="formbold-form-input m-LR-2 mb-10">
        <input type="text" id="img6_${count}" name="product-photo6" placeholder="pic url 6" class="formbold-form-input m-LR-2 mb-10">
      </div>

      <div class="flex flex-wrap center mb-3">
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone1_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus1_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone2_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus2_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone3_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus3_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone4_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus4_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone5_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus5_${count}"></div>
        </div>
         <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="dropZone6_${count}" ondragover="handleDragOver(event, this)" ondragleave="handleDragLeave(event, this)" ondrop="handleDrop(event, this)"> <div class="flex flex-column"><i class="bi bi-cloud-arrow-up"></i>Click Or Drop Image Here</div></div>
          <div id="uploadStatus6_${count}"></div>
        </div>
        <div class="flex flex-column align-items relative">

          <div class="drop-zone" id="adddropzone_${count}"> <div class="flex flex-column"><i class="bi bi-plus"></i>Add More Image</div></div>

        </div>
      </div>
      <div id="imageContainer"></div>
      <div class="flex center mb-3 mt-12">
        <div class="color-input-wrapper m-LR-2">
          <div class="flex center align-items">
            <input id="Colorbg${count}" style="width:45px;" type="text" name="color" class="formbold-form-input">
            <input id="Color${count}" type="color" name="color-value" class="color-picker">
            <input type="file" id="imageInput${count}" accept="image/png, image/jpeg" style="display: none;">
          </div>
          <div class="flex column align-items">
          <div class="change-ctib hidden" id="change-ctib-${count}" title="change color as image"> <i class="bi bi-images"></i></div>
          <div class="rtc-ctib" id="ReturnToColor-ctib-${count}" title="save image as color"style="top: 22px;"><i class="bi bi-arrow-left-right"></i></div>

          </div>
        </div>

        <input id="colorname${count}" type="text" name="color-name" style="width: 150px;" placeholder="Black" class="formbold-form-input m-LR-2">
      </div>
      <input type="file" id="cameraInput1_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput1_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput2_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput2_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput3_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput3_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput4_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput4_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput5_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput5_${count}" accept="image/*" style="display: none;">
      <input type="file" id="cameraInput6_${count}" accept="image/*" capture="camera" style="display: none;">
      <input type="file" id="galleryInput6_${count}" accept="image/*" style="display: none;">

    </div>
  `;
  // Call the reusable function to set up image upload
  setupImageUpload(newInputSet, count);
  // Set initial state for animation
  newInputSet.style.opacity = "0";
  newInputSet.style.transform = "translateY(-20px)";
  newInputSet.style.transition =
    "opacity 0.4s ease-out, transform 0.4s ease-out";

  inputContainer.appendChild(newInputSet);

  // Call the external function to set up the click handler for rtc-ctib
  setupRtcCtibClickHandler(count);

  // Trigger the transition after appending
  setTimeout(() => {
    newInputSet.style.opacity = "1";
    newInputSet.style.transform = "translateY(0)";
  }, 10);
  setupToggleExpand(newInputSet.querySelector(".toggle-expand"));
  setupDeleteButton(newInputSet.querySelector(".toggle-delete"));
  setupDuplicateButton(newInputSet.querySelector(".toggle-duplicate"));

  setupFileInputHandlers(count);
});

const productPriceInput = document.getElementById("productprice");
const saleAmountInput = document.getElementById("sale-amount");
const pricePlusCutInput = document.getElementById("priceplusthecut");
const finalPriceInput = document.getElementById("finalprice");
const storePriceInput = document.getElementById("Storeprice");

function calculateFinalPrice() {
  const productPrice = parseFloat(productPriceInput.value) || 0;
  const saleAmount = parseFloat(saleAmountInput.value) || 0;

  // Step 1: Add Matager's Cut to the Main Price
  const matagerCut = productPrice * matager_percentage;
  const pricePlusCut = Math.ceil(productPrice + matagerCut); // Round up
  pricePlusCutInput.value = pricePlusCut; // Update the input field

  // Step 2: Apply Sale on the Price + Cut
  const discount = pricePlusCut * (saleAmount / 100);
  const finalPrice = Math.ceil(pricePlusCut - discount); // Round up
  finalPriceInput.value = finalPrice; // Show price after sale

  // Step 3: Store Price = Final Price (rounded up)
  storePriceInput.value = finalPrice;
}

function toggleImageInputs(count) {
  const imageInputs = document.getElementById(`image-inputs-${count}`);
  const button = document.querySelector(
    `button[onclick="toggleImageInputs(${count})"]`
  );

  if (!imageInputs.classList.contains("open")) {
    // Dynamically set the height to its scrollHeight
    imageInputs.style.height = `${imageInputs.scrollHeight}px`;
    imageInputs.classList.add("open");
    button.innerHTML = 'Hide Images Urls <i class="bi bi-eye-slash-fill"></i>';

    // Remove inline height after transition ends
    imageInputs.addEventListener(
      "transitionend",
      () => (imageInputs.style.height = ""),
      { once: true }
    );
  } else {
    // Set the height to its current height before collapsing
    imageInputs.style.height = `${imageInputs.scrollHeight}px`;

    // Force reflow before collapsing
    requestAnimationFrame(() => {
      imageInputs.style.height = "0";
      imageInputs.classList.remove("open");
      button.innerHTML = 'Show Images Urls <i class="bi bi-eye-fill"></i>';
    });
  }
}

productPriceInput.addEventListener("input", calculateFinalPrice);
saleAmountInput.addEventListener("input", calculateFinalPrice);

//

productPriceInput.addEventListener("input", calculateFinalPrice);
saleAmountInput.addEventListener("input", calculateFinalPrice);

function setupToggleExpand(button) {
  button.addEventListener("click", function () {
    const expandIcon = button.querySelector(".bi-arrows-angle-expand");
    const contractIcon = button.querySelector(".bi-arrows-angle-contract");
    const inputSet = button.closest(".input-set");
    const productData = inputSet.querySelector("#product-data");

    // Determine the dynamic ID for the elements inside `product-data`
    const idSuffix = inputSet.id.replace(/^p/, ""); // Extracts the numeric part of the ID

    const sizeInput = productData.querySelector(`#size${idSuffix}`);
    const quantityInput = productData.querySelector(`#quantity${idSuffix}`);
    const colorInput = productData.querySelector(`#Color${idSuffix}`);

    const sizeLabel = inputSet.querySelector("#size");
    const quantityLabel = inputSet.querySelector("#Quantity");
    const colorCircleLabel = inputSet.querySelector("#Colorcircle");
    const sizeValue = inputSet.querySelector("#sizevalue");
    const colorValue = inputSet.querySelector("#colorvalue");
    const quantityValue = inputSet.querySelector("#QuantityValue");

    // Ensure `max-height` is properly initialized if not set
    if (!productData.style.maxHeight) {
      productData.style.maxHeight = "1300px"; // Ensure it starts open
      productData.style.opacity = "1";
      productData.style.padding = "10px 0";
    }

    const isExpanded = productData.style.maxHeight !== "0px";

    if (isExpanded) {
      // Collapse product data
      productData.style.maxHeight = "0px";
      productData.style.opacity = "0";
      productData.style.padding = "0";

      expandIcon.style.display = "inline";
      contractIcon.style.display = "none";

      sizeLabel.classList.remove("none");
      colorCircleLabel.classList.remove("none");
      quantityLabel.classList.remove("none");
      sizeValue.classList.remove("none");
      colorValue.classList.remove("none");
      quantityValue.classList.remove("none");

      // Display the values from the inputs
      if (sizeInput) sizeValue.textContent = sizeInput.value;
      if (quantityInput) quantityValue.textContent = quantityInput.value;
      if (colorInput) {
        colorCircleLabel.style.backgroundColor = colorInput.value;
        colorValue.textContent = colorInput.value;
      }
    } else {
      // Expand product data
      productData.style.maxHeight = "1300px";
      productData.style.opacity = "1";
      productData.style.padding = "10px 0";

      expandIcon.style.display = "none";
      contractIcon.style.display = "inline";

      sizeLabel.classList.add("none");
      colorCircleLabel.classList.add("none");
      quantityLabel.classList.add("none");
      sizeValue.classList.add("none");
      colorValue.classList.add("none");
      quantityValue.classList.add("none");
    }
  });
}

function setupDeleteButton(button) {
  button.addEventListener("click", function () {
    const element = button.closest(".product-record");
    const inputContainer = document.getElementById("input-container");

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this size item?",
      icon: "warning",
      toast: true,
      position: "top-end",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      timer: 5000, // Auto close in 5 seconds if no action
    }).then((result) => {
      if (result.isConfirmed) {
        // Apply transition effects
        element.style.transition =
          "border-color 0.3s ease-in, transform 0.6s ease-in-out";
        element.style.transform = "translateX(150%)"; // Swipe right

        // Wait before reducing height
        setTimeout(() => {
          element.style.transition =
            "height 0.4s ease-out, margin 0.4s ease-out";
          element.style.height = "0px";
          element.style.margin = "0px";
          element.style.padding = "0px";
          element.style.overflow = "hidden";
        }, 500);

        // Remove the element after the height animation
        setTimeout(() => {
          element.remove();
          adjustContainerHeight(inputContainer);
        }, 900);

        // Show a success toast
        Swal.fire({
          title: "Deleted!",
          text: "The size item has been removed.",
          icon: "success",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    });
  });
}

function adjustContainerHeight(container) {
  container.style.transition = "height 0.5s ease-in-out";
  container.style.height = "auto"; // Adjust height smoothly
}

function setupDuplicateButton(button) {
  button.addEventListener("click", function () {
    const productRecord = button.closest(".product-record");
    const id = productRecord ? productRecord.id : null;

    if (id) {
      const newProductRecord = productRecord.cloneNode(true);
      const currentCount = document.querySelectorAll(".input-set").length + 1;
      newProductRecord.id = `p${currentCount}`;

      // Update IDs for inputs and elements within the new duplicate
      updateElementIds(newProductRecord, currentCount);

      // Set initial state for animation
      newProductRecord.style.opacity = "0";
      newProductRecord.style.transform = "translateY(-20px)";
      newProductRecord.style.transition =
        "opacity 0.4s ease-out, transform 0.4s ease-out";

      // Append the cloned record
      const inputContainer = document.getElementById("input-container");
      inputContainer.appendChild(newProductRecord);

      // Trigger animation after appending
      setTimeout(() => {
        newProductRecord.style.opacity = "1";
        newProductRecord.style.transform = "translateY(0)";
      }, 10);
      // Reinitialize event handlers
      setupToggleExpand(newProductRecord.querySelector(".toggle-expand"));
      setupDeleteButton(newProductRecord.querySelector(".toggle-delete"));
      setupDuplicateButton(newProductRecord.querySelector(".toggle-duplicate"));
      setupImageUpload(newProductRecord, currentCount);
      setupFileInputHandlers(currentCount);
      setupRtcCtibClickHandler(currentCount);
    }
  });
}

function duplicatePlus(sizeInputId) {
  const sizeInput = document.getElementById(sizeInputId);
  const sizeValue = sizeInput.value.trim();

  // Check if the size is a valid number
  if (isNaN(sizeValue)) {
    // Show SweetAlert toast if size is not a number
    Swal.fire({
      icon: "error",
      title: "Invalid Size",
      text: "Size must be a number to use this feature.",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
    return; // Exit the function
  }

  // Clone the product record
  const productRecord = sizeInput.closest(".product-record");
  if (!productRecord) return;

  const newProductRecord = productRecord.cloneNode(true);
  const currentCount = document.querySelectorAll(".product-record").length + 1;

  // Update IDs for inputs and elements within the new duplicate
  updateElementIds(newProductRecord, currentCount);

  // Increment the size value in the cloned record
  const newSizeInput = newProductRecord.querySelector(`input[name="size"]`);
  if (newSizeInput) {
    const newSizeValue = parseInt(newSizeInput.value, 10) + 1;
    newSizeInput.value = newSizeValue;
  }

  // Hide the duplicate button in the original record
  const originalDuplicateBtn =
    productRecord.querySelector(".duplicatePlus-btn");
  if (originalDuplicateBtn) {
    originalDuplicateBtn.classList.add("hidden");
  }

  // Set initial state for animation
  newProductRecord.style.opacity = "0";
  newProductRecord.style.transform = "translateY(-20px)";
  newProductRecord.style.transition =
    "opacity 0.4s ease-out, transform 0.4s ease-out";

  // Append the cloned record
  const inputContainer = document.getElementById("input-container");
  inputContainer.appendChild(newProductRecord);

  // Trigger animation after appending
  setTimeout(() => {
    newProductRecord.style.opacity = "1";
    newProductRecord.style.transform = "translateY(0)";
  }, 10);

  // Smoothly scroll to the top of the new duplicated record
  newProductRecord.scrollIntoView({ behavior: "smooth", block: "start" });

  // Reinitialize event handlers
  setupToggleExpand(newProductRecord.querySelector(".toggle-expand"));
  setupDeleteButton(newProductRecord.querySelector(".toggle-delete"));
  setupDuplicateButton(newProductRecord.querySelector(".toggle-duplicate"));
  setupImageUpload(newProductRecord, currentCount);
  setupFileInputHandlers(currentCount);
  setupRtcCtibClickHandler(currentCount);
}

//
// function duplicateInRange(sizeInputId) {
//   const modal = document.getElementById("rangeDuplicateModal");
//   const closeBtn = modal.querySelector(".close");
//   const confirmBtn = modal.querySelector("#confirmDuplicateRange");
//   const startSizeInput = modal.querySelector("#startSize");
//   const endSizeInput = modal.querySelector("#endSize");

//   // Open the modal
//   modal.style.display = "flex";

//   // Close the modal when the close button is clicked
//   closeBtn.onclick = () => {
//     modal.style.display = "none";
//   };

//   // Close the modal when clicking outside of it
//   window.onclick = (event) => {
//     if (event.target === modal) {
//       modal.style.display = "none";
//     }
//   };

//   // Handle the confirmation button click
//   confirmBtn.onclick = () => {
//     const startSize = parseInt(startSizeInput.value.trim(), 10);
//     const endSize = parseInt(endSizeInput.value.trim(), 10);

//     // Validate the inputs
//     if (isNaN(startSize) || isNaN(endSize) || startSize >= endSize) {
//       Swal.fire({
//         icon: "error",
//         title: "Invalid Range",
//         text: "Please enter a valid start and end size.",
//         toast: true,
//         position: "top-end",
//         showConfirmButton: false,
//         timer: 3000,
//         timerProgressBar: true,
//       });
//       return;
//     }

//     // Close the modal
//     modal.style.display = "none";

//     // Get the original product record
//     const sizeInput = document.getElementById(sizeInputId);
//     const productRecord = sizeInput.closest(".product-record");
//     if (!productRecord) return;

//     // Calculate the number of duplicates
//     const numberOfDuplicates = endSize - startSize + 1;

//     // Duplicate the product record for each size in the range
//     for (let i = 0; i < numberOfDuplicates; i++) {
//       const newProductRecord = productRecord.cloneNode(true);
//       const currentCount =
//         document.querySelectorAll(".product-record").length + 1;

//       // Update IDs for inputs and elements within the new duplicate
//       updateElementIds(newProductRecord, currentCount);

//       // Set the size value in the cloned record
//       const newSizeInput = newProductRecord.querySelector(`input[name="size"]`);
//       if (newSizeInput) {
//         newSizeInput.value = startSize + i;
//       }

//       // Hide the duplicate button in the original record
//       const originalDuplicateBtn =
//         productRecord.querySelector(".duplicatePlus-btn");
//       if (originalDuplicateBtn) {
//         originalDuplicateBtn.classList.add("hidden");
//       }

//       // Set initial state for animation
//       newProductRecord.style.opacity = "0";
//       newProductRecord.style.transform = "translateY(-20px)";
//       newProductRecord.style.transition =
//         "opacity 0.4s ease-out, transform 0.4s ease-out";

//       // Append the cloned record
//       const inputContainer = document.getElementById("input-container");
//       inputContainer.appendChild(newProductRecord);

//       // Trigger animation after appending
//       setTimeout(() => {
//         newProductRecord.style.opacity = "1";
//         newProductRecord.style.transform = "translateY(0)";
//       }, 10);

//       // Reinitialize event handlers
//       setupToggleExpand(newProductRecord.querySelector(".toggle-expand"));
//       setupDeleteButton(newProductRecord.querySelector(".toggle-delete"));
//       setupDuplicateButton(newProductRecord.querySelector(".toggle-duplicate"));
//       setupImageUpload(newProductRecord, currentCount);
//       setupFileInputHandlers(currentCount);
//       setupRtcCtibClickHandler(currentCount);
//     }

//     // Smoothly scroll to the end of the duplicated items
//     const lastDuplicatedRecord =
//       document.querySelectorAll(".product-record")[
//         document.querySelectorAll(".product-record").length - 1
//       ];
//     lastDuplicatedRecord.scrollIntoView({ behavior: "smooth", block: "start" });
//   };
// }

function duplicateInRange(sizeInputId) {
  const modal = document.getElementById("rangeDuplicateModal");
  const closeBtn = modal.querySelector(".close");
  const confirmBtn = modal.querySelector("#confirmDuplicateRange");
  const startSizeInput = modal.querySelector("#startSize");
  const endSizeInput = modal.querySelector("#endSize");

  // Open the modal
  modal.style.display = "flex";

  // Close the modal when the close button is clicked
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  // Close the modal when clicking outside of it
  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };

  // Handle the confirmation button click
  confirmBtn.onclick = () => {
    const startSize = parseInt(startSizeInput.value.trim(), 10);
    const endSize = parseInt(endSizeInput.value.trim(), 10);

    // Validate the inputs
    if (isNaN(startSize) || isNaN(endSize) || startSize >= endSize) {
      Swal.fire({
        icon: "error",
        title: "Invalid Range",
        text: "Please enter a valid start and end size.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      return;
    }

    // Close the modal
    modal.style.display = "none";

    // Get the original product record
    const sizeInput = document.getElementById(sizeInputId);
    const productRecord = sizeInput.closest(".product-record");
    if (!productRecord) return;

    // Calculate the number of duplicates
    const numberOfDuplicates = endSize - startSize + 1;

    // Duplicate the product record for each size in the range
    for (let i = 0; i < numberOfDuplicates; i++) {
      const newProductRecord = productRecord.cloneNode(true);
      const currentCount =
        document.querySelectorAll(".product-record").length + 1;

      // Update IDs for inputs and elements within the new duplicate
      updateElementIds(newProductRecord, currentCount);

      // Set the size value in the cloned record
      const newSizeInput = newProductRecord.querySelector(`input[name="size"]`);
      if (newSizeInput) {
        newSizeInput.value = startSize + i;
      }

      // Hide the duplicate button in the original record
      const originalDuplicateBtn =
        productRecord.querySelector(".duplicatePlus-btn");
      if (originalDuplicateBtn) {
        originalDuplicateBtn.classList.add("hidden");
      }

      // Hide the duplicate button in the duplicated records
      const newDuplicateBtn =
        newProductRecord.querySelector(".duplicatePlus-btn");
      if (newDuplicateBtn) {
        newDuplicateBtn.classList.add("hidden");
      }

      // Set initial state for animation
      newProductRecord.style.opacity = "0";
      newProductRecord.style.transform = "translateY(-20px)";
      newProductRecord.style.transition =
        "opacity 0.4s ease-out, transform 0.4s ease-out";

      // Append the cloned record
      const inputContainer = document.getElementById("input-container");
      inputContainer.appendChild(newProductRecord);

      // Trigger animation after appending
      setTimeout(() => {
        newProductRecord.style.opacity = "1";
        newProductRecord.style.transform = "translateY(0)";
      }, 10);

      // Reinitialize event handlers
      setupToggleExpand(newProductRecord.querySelector(".toggle-expand"));
      setupDeleteButton(newProductRecord.querySelector(".toggle-delete"));
      setupDuplicateButton(newProductRecord.querySelector(".toggle-duplicate"));
      setupImageUpload(newProductRecord, currentCount);
      setupFileInputHandlers(currentCount);
      setupRtcCtibClickHandler(currentCount);
    }

    // Smoothly scroll to the end of the duplicated items
    const lastDuplicatedRecord =
      document.querySelectorAll(".product-record")[
        document.querySelectorAll(".product-record").length - 1
      ];
    lastDuplicatedRecord.scrollIntoView({ behavior: "smooth", block: "start" });

    // Show success toast
    Swal.fire({
      icon: "success",
      title: "Duplicated Successfully",
      text: `Duplicated ${numberOfDuplicates} Items.`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  };
}

function updateElementIds(record, count) {
  record.querySelectorAll("[id]").forEach((element) => {
    // Handle IDs ending with numbers
    if (/\d+$/.test(element.id)) {
      element.id = element.id.replace(/\d+$/, count);
    }
    // Handle IDs with underscores (e.g., img1_1 -> img1_count)
    else if (element.id.includes("_")) {
      const parts = element.id.split("_");
      element.id = `${parts[0]}_${count}`;
    }
    // Handle IDs with 'image-inputs-' prefix
    else if (element.id.includes("image-inputs-")) {
      element.id = `image-inputs-${count}`;
    }
  });

  // Update "onclick" attributes for buttons
  record.querySelectorAll("[onclick]").forEach((button) => {
    button.setAttribute(
      "onclick",
      button.getAttribute("onclick").replace(/\d+/, count)
    );
  });
}

function setupFileInputHandlers(count) {
  const dropZone1 = document.getElementById(`dropZone1_${count}`);
  const dropZone2 = document.getElementById(`dropZone2_${count}`);
  const dropZone3 = document.getElementById(`dropZone3_${count}`);
  const dropZone4 = document.getElementById(`dropZone4_${count}`);
  const dropZone5 = document.getElementById(`dropZone5_${count}`);
  const dropZone6 = document.getElementById(`dropZone6_${count}`);
  const uploadStatus1 = document.getElementById(`uploadStatus1_${count}`);
  const uploadStatus2 = document.getElementById(`uploadStatus2_${count}`);
  const uploadStatus3 = document.getElementById(`uploadStatus3_${count}`);
  const uploadStatus4 = document.getElementById(`uploadStatus4_${count}`);
  const uploadStatus5 = document.getElementById(`uploadStatus5_${count}`);
  const uploadStatus6 = document.getElementById(`uploadStatus6_${count}`);
  const cameraInput1 = document.getElementById(`cameraInput1_${count}`);
  const galleryInput1 = document.getElementById(`galleryInput1_${count}`);
  const cameraInput2 = document.getElementById(`cameraInput2_${count}`);
  const galleryInput2 = document.getElementById(`galleryInput2_${count}`);
  const cameraInput3 = document.getElementById(`cameraInput3_${count}`);
  const galleryInput3 = document.getElementById(`galleryInput3_${count}`);
  const cameraInput4 = document.getElementById(`cameraInput4_${count}`);
  const galleryInput4 = document.getElementById(`galleryInput4_${count}`);
  const cameraInput5 = document.getElementById(`cameraInput5_${count}`);
  const galleryInput5 = document.getElementById(`galleryInput5_${count}`);
  const cameraInput6 = document.getElementById(`cameraInput6_${count}`);
  const galleryInput6 = document.getElementById(`galleryInput6_${count}`);

  dropZone1.addEventListener("click", () => galleryInput1.click());
  dropZone2.addEventListener("click", () => galleryInput2.click());
  dropZone3.addEventListener("click", () => galleryInput3.click());
  dropZone4.addEventListener("click", () => galleryInput4.click());
  dropZone5.addEventListener("click", () => galleryInput5.click());
  dropZone6.addEventListener("click", () => galleryInput6.click());

  galleryInput1.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone1, uploadStatus1)
  );
  cameraInput1.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone1, uploadStatus1)
  );
  galleryInput2.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone2, uploadStatus2)
  );
  cameraInput2.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone2, uploadStatus2)
  );

  //
  galleryInput3.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone3, uploadStatus3)
  );
  cameraInput3.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone3, uploadStatus3)
  );
  galleryInput4.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone4, uploadStatus4)
  );
  cameraInput4.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone4, uploadStatus4)
  );
  //
  galleryInput5.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone5, uploadStatus5)
  );
  cameraInput5.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone5, uploadStatus5)
  );
  galleryInput6.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone6, uploadStatus6)
  );
  cameraInput6.addEventListener("change", (event) =>
    handleFileSelect(event, dropZone6, uploadStatus6)
  );
}

async function handleFileSelect(event, dropZone) {
  const file = event.target.files[0];
  const formData = new FormData();
  formData.append("image", file);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }

  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    // choose by the 2 ways
    // const result = await imgurUpload(clientId, formData);
    const result = await uploadToCloudinary(file, uploadPreset, cloudName);
    preloader.remove();

    const imageUrl = result.data?.link;
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status", "upload-ico");

    if (result.success) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      dropZone.innerHTML = "";
      dropZone.appendChild(imgElement);

      // Extract the dropZone number and use it for setting the corresponding img
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId

      // Check if the dropZoneNumber is within the range 1-6
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-cloud-check"></i></p>`;
      }
    } else {
      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-cloud-slash red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      }
    }

    // Append upload status to the parent of the drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-cloud-slash red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

function handleDragOver(event, dropZone) {
  event.preventDefault();
  dropZone.classList.add("drag-over");
}

function handleDragLeave(event, dropZone) {
  dropZone.classList.remove("drag-over");
}

async function handleDrop(event, dropZone) {
  event.preventDefault();
  dropZone.classList.remove("drag-over");

  const files = event.dataTransfer.files;
  if (files.length === 0) return;

  const formData = new FormData();
  formData.append("image", files[0]);

  const preloader = document.createElement("div");
  preloader.classList.add("uploadloader");
  dropZone.appendChild(preloader);

  // Remove any existing upload status elements
  const existingUploadStatus =
    dropZone.parentElement.querySelector(".upload-status");
  if (existingUploadStatus) {
    existingUploadStatus.remove();
  }

  const dropZoneId = dropZone.id;
  const count = dropZoneId.split("_").pop(); // Extract the count from the drop zone ID

  try {
    // choose by the 2 ways
    // const result = await imgurUpload(clientId, formData);
    const result = await uploadToCloudinary(files[0], uploadPreset, cloudName);
    preloader.remove();

    const imageUrl = result.data?.link;
    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status", "upload-ico");

    if (result.success) {
      const imgElement = document.createElement("img");
      imgElement.src = imageUrl;
      dropZone.innerHTML = "";
      dropZone.appendChild(imgElement);

      // Extract the dropZone number and use it for setting the corresponding img
      const dropZoneNumber = dropZoneId.match(/\d+/)[0]; // Extract the number from dropZoneId

      // Check if the dropZoneNumber is within the range 1-6
      if (dropZoneNumber >= 1 && dropZoneNumber <= 6) {
        document.getElementById(`img${dropZoneNumber}_${count}`).value =
          imageUrl;
      }

      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-cloud-check"></i></p>`;
      }
    } else {
      if (uploadStatus) {
        uploadStatus.innerHTML = `<p><i class="bi bi-cloud-slash red-check"></i></p><p class="hidden">${result.data.error}</p>`;
      }
    }

    // Append upload status to the parent of the drop zone
    dropZone.parentElement.appendChild(uploadStatus);
  } catch (error) {
    preloader.remove();

    const uploadStatus = document.createElement("div");
    uploadStatus.classList.add("upload-status");
    uploadStatus.innerHTML = `<p><i class="bi bi-cloud-slash red-check"></i></p><p class="hidden">${error.message}</p>`;
    dropZone.parentElement.appendChild(uploadStatus);
  }
}

document.querySelectorAll(".toggle-expand").forEach(function (button) {
  setupToggleExpand(button);
});

document.querySelectorAll(".toggle-delete").forEach(function (button) {
  setupDeleteButton(button);
});

// External function to handle the click event for rtc-ctib

function setupRtcCtibClickHandler(count) {
  // Get the rtc-ctib element
  const rtcCtib = document.getElementById(`ReturnToColor-ctib-${count}`);
  if (!rtcCtib) {
    console.error(`Element not found: ReturnToColor-ctib-${count}`);
    return;
  }

  // Get the change-ctib, save-ctib, color input, and Colorbg input elements
  const changeCtib = document.getElementById(`change-ctib-${count}`);
  const colorInput = document.getElementById(`Color${count}`);
  const colorBgInput = document.getElementById(`Colorbg${count}`);
  const imageInput = document.getElementById(`imageInput${count}`);

  // Check if the elements exist
  if (!changeCtib || !colorInput || !colorBgInput) {
    console.error(
      `Elements not found: change-ctib-${count}, save-ctib-${count}, Color${count}, or Colorbg${count}`
    );
    return;
  }

  // Function to show the change-ctib and save-ctib elements
  const showElements = () => {
    changeCtib.classList.remove("hidden");

    // Trigger the transition by forcing a reflow
    void changeCtib.offsetWidth; // Force reflow

    // Add the visible class to trigger the transition
    changeCtib.classList.add("visible");

    // Hide the color input and make Colorbg input read-only
    colorInput.classList.add("hidden");
    colorBgInput.classList.add("cursornotallowed");
    colorBgInput.readOnly = true;
  };

  // Function to hide the change-ctib and save-ctib elements
  const hideElements = () => {
    changeCtib.classList.remove("visible");

    // Wait for the transition to complete before adding the hidden class
    setTimeout(() => {
      changeCtib.classList.add("hidden");
      colorBgInput.readOnly = false;
    }, 300); // Match this delay to the transition duration in CSS
  };

  // Function to show the color picker and remove the background image
  const showColorPicker = () => {
    // Remove the background image
    colorBgInput.style.backgroundImage = "";

    // Show the color picker with a transition
    colorInput.style.opacity = "0"; // Start fully transparent
    colorInput.style.transition = "opacity 0.3s ease"; // Smooth transition
    colorInput.classList.remove("hidden");

    // Trigger the transition by forcing a reflow
    void colorInput.offsetWidth; // Force reflow

    // Fade in the color picker
    colorInput.style.opacity = "1";

    // Make Colorbg input editable and remove the not-allowed cursor
    colorBgInput.readOnly = false;
    colorBgInput.classList.remove("cursornotallowed");
    colorBgInput.style.zIndex = "0";
  };

  // Add a click event listener to rtc-ctib
  rtcCtib.addEventListener("click", () => {
    const isVisible = changeCtib.classList.contains("visible");
    if (isVisible) {
      hideElements();
      showColorPicker(); // Show the color picker and remove the background image
    } else {
      showElements();
    }
  });

  // Add a click event listener to Colorbg input
  colorBgInput.addEventListener("click", () => {
    if (colorBgInput.readOnly) {
      showElements();
      imageInput.click();
    }
  });
}
document
  .getElementById("add-product-form")
  .addEventListener("submit", function (event) {
    // Get the selected size chart URL
    const sizeChartSelect = document.getElementById("size-chart");
    const selectedOption =
      sizeChartSelect.options[sizeChartSelect.selectedIndex];

    const selectedSizeChartUrl = selectedOption ? selectedOption.value : ""; // Get only selected or empty

    event.preventDefault(); // Prevent default form submission behavior

    // Check if the user is authenticated
    const user = firebase.auth().currentUser; // Get the current user
    if (!user) {
      Swal.fire({
        title: "Authentication Required!",
        text: "You need to be signed in to add a product.",
        icon: "warning",
        confirmButtonText: "Okay",
        customClass: {
          container: "swal2-custom",
          title: "swal2-custom",
        },
      });
      return; // Exit if the user is not authenticated
    }

    // if (user) {
    //   // Get the ID token of the authenticated user
    //   user.getIdToken().then((idToken) => {
    //     // Show the preloader and disable the submit button
    //     const submitButton = document.getElementById("sub-spin");
    //     const submitTxt = document.getElementById("sub-txt");

    //     submitTxt.classList.add("hidden");
    //     submitButton.classList.remove("hidden");

    //     // Collect input values
    //     const formData = new FormData(this);
    //     const product = {
    //       "Brand-Name": formData.get("Brand-Name"),
    //       "Product-Price": pricePlusCutInput.value, // Get the calculated price,
    //       "Price-before": productPriceInput.value,
    //       category: formData.get("category"),
    //       type: formData.get("Type"),
    //       piece: formData.get("Piece"),
    //       "sale-amount": formData.get("sale-amount"),
    //       "product-description": formData.get("product-description"),
    //       "posted-at": new Date().toLocaleString(),
    //       "product-photo": "", // Placeholder, will be set later
    //       "product-photo2": "", // Placeholder, will be set later
    //       "product-photo3": "", // Placeholder, will be set later
    //       "product-photo4": "", // Placeholder, will be set later
    //       "product-photo5": "", // Placeholder, will be set later
    //       "product-photo6": "", // Placeholder, will be set later
    //       "product-title": formData.get("product-title"),
    //       sizes: {}, // Object to store sizes and colors
    //       "size-chart-url": selectedSizeChartUrl, // Add the selected size chart URL
    //     };

    //     // Iterate through each product input set
    //     document.querySelectorAll(".input-set").forEach((productSet) => {
    //       const size = productSet.querySelector('input[name="size"]').value;
    //       const colorname = productSet.querySelector(
    //         'input[name="color-name"]'
    //       ).value;
    //       const colorValue = productSet.querySelector(
    //         'input[name="color-value"]'
    //       ).value;
    //       const quantity = parseInt(
    //         productSet.querySelector('input[name="quantity"]').value
    //       ); // Convert to integer
    //       const imageUrl1 = productSet.querySelector(
    //         'input[name="product-photo"]'
    //       ).value;
    //       const imageUrl2 = productSet.querySelector(
    //         'input[name="product-photo2"]'
    //       ).value;
    //       const imageUrl3 = productSet.querySelector(
    //         'input[name="product-photo3"]'
    //       ).value;
    //       const imageUrl4 = productSet.querySelector(
    //         'input[name="product-photo4"]'
    //       ).value;
    //       const imageUrl5 = productSet.querySelector(
    //         'input[name="product-photo5"]'
    //       ).value;
    //       const imageUrl6 = productSet.querySelector(
    //         'input[name="product-photo6"]'
    //       ).value;

    //       // Set product photos if not already set
    //       if (!product["product-photo"]) product["product-photo"] = imageUrl1;
    //       if (!product["product-photo2"]) product["product-photo2"] = imageUrl2;
    //       if (!product["product-photo3"]) product["product-photo3"] = imageUrl3;
    //       if (!product["product-photo4"]) product["product-photo4"] = imageUrl4;
    //       if (!product["product-photo5"]) product["product-photo5"] = imageUrl5;
    //       if (!product["product-photo6"]) product["product-photo6"] = imageUrl6;

    //       // Create the color object
    //       const colorObject = {
    //         "color-value": colorValue,
    //         img1: imageUrl1,
    //         img2: imageUrl2,
    //         img3: imageUrl3,
    //         img4: imageUrl4,
    //         img5: imageUrl5,
    //         img6: imageUrl6,
    //         qty: quantity,
    //       };

    //       // Check if the size already exists in the product's sizes object
    //       if (!product.sizes[size]) {
    //         product.sizes[size] = {};
    //       }

    //       // Add the color object to the corresponding size
    //       product.sizes[size][colorname] = colorObject;
    //     });

    //     // Send the product object to the specified API URL with the ID token in the headers
    //     fetch(
    //       `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${user.uid}/Products.json?auth=${idToken}`,
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //           Authorization: `Bearer ${idToken}`,
    //         },
    //         body: JSON.stringify(product),
    //       }
    //     )
    //       .then((response) => {
    //         if (!response.ok) {
    //           throw new Error("Network response was not ok");
    //         }
    //         return response.json();
    //       })
    //       // .then((data) => {
    //       //   Swal.fire({
    //       //     title: "Success!",
    //       //     text: "Product added successfully.",
    //       //     icon: "success",
    //       //     showConfirmButton: false,
    //       //     customClass: {
    //       //       container: "swal2-custom",
    //       //       title: "swal2-custom",
    //       //     },
    //       //   });
    //       .then((data) => {
    //         Swal.fire({
    //           title: "Success!",
    //           text: "Product added successfully.",
    //           icon: "success",
    //           toast: true, // Enables top-right position
    //           position: "top-end",
    //           showConfirmButton: false,
    //           timer: 5000, // Auto-dismiss after 5 seconds
    //           customClass: {
    //             container: "swal2-custom",
    //             title: "swal2-custom",
    //           },
    //         });
    //         decreaseStock();
    //         document.getElementById("add-product-form").reset(); // Reset form
    //         document.getElementById("input-container").innerHTML = "";
    //         submitTxt.classList.remove("hidden");
    //         submitButton.classList.add("hidden");

    //         // Wait for 1.5 seconds before reloading the page
    //         // setTimeout(() => {
    //         //   window.location.reload();
    //         // }, 1500);
    //       })
    //       .catch((error) => {
    //         console.error("Error adding document: ", error);
    //         Swal.fire({
    //           title: "Error!",
    //           text: "An error occurred while adding the product.",
    //           icon: "error",
    //           customClass: {
    //             container: "swal2-custom",
    //             title: "swal2-custom",
    //           },
    //         });
    //         // Hide spinner
    //         submitTxt.classList.remove("hidden");
    //         submitButton.classList.add("hidden");
    //       });
    //   });
    // }
    if (user) {
      // Get the ID token of the authenticated user
      user.getIdToken().then((idToken) => {
        // Show the preloader and disable the submit button
        const submitButton = document.getElementById("sub-spin");
        const submitTxt = document.getElementById("sub-txt");

        submitTxt.classList.add("hidden");
        submitButton.classList.remove("hidden");
        // Collect input values
        const formData = new FormData(this);
        const saleAmount = formData.get("sale-amount")
          ? parseInt(formData.get("sale-amount"))
          : 0;
        const product = {
          "Brand-Name": formData.get("Brand-Name"),
          "Product-Price": pricePlusCutInput.value, // Get the calculated price
          "Price-before": productPriceInput.value,
          category: formData.get("category"),
          type: formData.get("Type"),
          piece: formData.get("Piece"),
          "sale-amount": saleAmount,
          "product-description": formData.get("product-description"),
          "posted-at": new Date().toLocaleString(),
          "product-photo": "", // Placeholder, will be set later
          "product-photo2": "", // Placeholder, will be set later
          "product-photo3": "", // Placeholder, will be set later
          "product-photo4": "", // Placeholder, will be set later
          "product-photo5": "", // Placeholder, will be set later
          "product-photo6": "", // Placeholder, will be set later
          "product-title": formData.get("product-title"),
          sizes: {}, // Object to store sizes and colors
          "size-chart-url": selectedSizeChartUrl, // Add the selected size chart URL
        };

        // Iterate through each product input set
        document.querySelectorAll(".input-set").forEach((productSet) => {
          const size = productSet.querySelector('input[name="size"]').value;
          const colorname = productSet.querySelector(
            'input[name="color-name"]'
          ).value;
          const colorValue = productSet.querySelector(
            'input[name="color-value"]'
          ).value;
          const quantity = parseInt(
            productSet.querySelector('input[name="quantity"]').value
          ); // Convert to integer
          const imageUrl1 = productSet.querySelector(
            'input[name="product-photo"]'
          ).value;
          const imageUrl2 = productSet.querySelector(
            'input[name="product-photo2"]'
          ).value;
          const imageUrl3 = productSet.querySelector(
            'input[name="product-photo3"]'
          ).value;
          const imageUrl4 = productSet.querySelector(
            'input[name="product-photo4"]'
          ).value;
          const imageUrl5 = productSet.querySelector(
            'input[name="product-photo5"]'
          ).value;
          const imageUrl6 = productSet.querySelector(
            'input[name="product-photo6"]'
          ).value;

          // Set product photos if not already set
          if (!product["product-photo"] && imageUrl1)
            product["product-photo"] = imageUrl1;
          if (!product["product-photo2"] && imageUrl2)
            product["product-photo2"] = imageUrl2;
          if (!product["product-photo3"] && imageUrl3)
            product["product-photo3"] = imageUrl3;
          if (!product["product-photo4"] && imageUrl4)
            product["product-photo4"] = imageUrl4;
          if (!product["product-photo5"] && imageUrl5)
            product["product-photo5"] = imageUrl5;
          if (!product["product-photo6"] && imageUrl6)
            product["product-photo6"] = imageUrl6;

          // Create the color object
          const colorObject = {
            "color-value": colorValue,
            img1: imageUrl1,
            img2: imageUrl2,
            img3: imageUrl3,
            img4: imageUrl4,
            img5: imageUrl5,
            img6: imageUrl6,
            qty: quantity,
          };

          // Remove empty image fields from the color object
          Object.keys(colorObject).forEach((key) => {
            if (colorObject[key] === "") {
              delete colorObject[key];
            }
          });

          // Check if the size already exists in the product's sizes object
          if (!product.sizes[size]) {
            product.sizes[size] = {};
          }

          // Add the color object to the corresponding size
          product.sizes[size][colorname] = colorObject;
        });

        // Remove empty fields from the product object
        const cleanProduct = {};
        Object.keys(product).forEach((key) => {
          if (
            product[key] !== "" &&
            !(
              typeof product[key] === "object" &&
              Object.keys(product[key]).length === 0
            )
          ) {
            cleanProduct[key] = product[key];
          }
        });

        // Validate if at least one image is provided
        const hasImages =
          cleanProduct["product-photo"] ||
          cleanProduct["product-photo2"] ||
          cleanProduct["product-photo3"] ||
          cleanProduct["product-photo4"] ||
          cleanProduct["product-photo5"] ||
          cleanProduct["product-photo6"];

        if (!hasImages) {
          // Show SweetAlert toast if no images are provided
          Swal.fire({
            text: "Cannot upload product without images.",
            icon: "info",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 5000,
            customClass: {
              container: "swal2-custom",
              title: "swal2-custom",
            },
          });

          // Hide spinner and reset button
          submitTxt.classList.remove("hidden");
          submitButton.classList.add("hidden");
          return; // Stop further execution
        }

        // Send the cleaned product object to the specified API URL with the ID token in the headers
        fetch(
          `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${user.uid}/Products.json?auth=${idToken}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify(cleanProduct),
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            Swal.fire({
              title: "Success!",
              text: "Product added successfully.",
              icon: "success",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 5000,
              customClass: {
                container: "swal2-custom",
                title: "swal2-custom",
              },
            });
            decreaseStock();
            document.getElementById("add-product-form").reset(); // Reset form
            document.getElementById("input-container").innerHTML = "";
            submitTxt.classList.remove("hidden");
            submitButton.classList.add("hidden");
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while adding the product.",
              icon: "error",
              customClass: {
                container: "swal2-custom",
                title: "swal2-custom",
              },
            });
            // Hide spinner
            submitTxt.classList.remove("hidden");
            submitButton.classList.add("hidden");
          });
      });
    }
  });
