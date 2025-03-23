// async function handleBuyNowClick() {
//   // Get product details
//   const brandName = document.getElementById("BrandName").innerText;
//   const productTitle = document.getElementById("productTitle").innerText;
//   const productPrice = document.getElementById("productPrice").innerText;
//   const productSize = document.getElementById("product-Size").innerText;
//   const productColor = document.getElementById("product-color").innerText;
//   const productID = document.getElementById("productID").innerText;

//   // Show the form to collect user details
//   showUserForm();
// }

// // Function to show the user form
// function showUserForm() {
//   // Smoothly scroll to the top of the page
//   window.scrollTo({
//     top: 0,
//     behavior: "smooth",
//   });

//   // Create a form element
//   const form = document.createElement("form");
//   form.classList.add("BuyItNowForm");

//   // Get product details
//   const productImage = document.getElementById("productImage").src;
//   const productSize = document.getElementById("product-Size").innerText;
//   const productColor = document.getElementById("product-color").innerText;
//   const productPrice = document.getElementById("productPrice").innerText;

//   // Create a container for the product summary
//   const productSummary = document.createElement("div");
//   productSummary.style.display = "flex";
//   productSummary.style.alignItems = "center";
//   productSummary.style.gap = "10px";
//   productSummary.style.marginBottom = "20px";
//   productSummary.style.flexDirection = "column"; // Stack items vertically

//   // Create a container for the product image with a size badge
//   const imageContainer = document.createElement("div");
//   imageContainer.style.position = "relative"; // For absolute positioning of the badge

//   // Add the product image
//   const productImageElement = document.createElement("img");
//   productImageElement.src = productImage;
//   productImageElement.style.width = "100px";
//   productImageElement.style.height = "100px";
//   productImageElement.style.borderRadius = "5px";
//   productImageElement.style.objectFit = "cover";
//   productImageElement.style.margin = "20px"; // Add margin around the image
//   imageContainer.appendChild(productImageElement);

//   // Add the size badge
//   const sizeBadge = document.createElement("p");
//   sizeBadge.innerText = productSize;
//   sizeBadge.style.color = "white";
//   sizeBadge.style.backgroundColor = "black";
//   sizeBadge.style.borderRadius = "5px";
//   sizeBadge.style.padding = "5px";
//   sizeBadge.style.position = "absolute";
//   sizeBadge.style.top = "0";
//   sizeBadge.style.width = "fit-content";
//   sizeBadge.style.margin = "0";
//   sizeBadge.style.fontSize = "14px";
//   imageContainer.appendChild(sizeBadge);

//   // Add the product color
//   const colorText = document.createElement("p");
//   colorText.innerText = `${productColor}`;
//   colorText.style.margin = "0";
//   colorText.style.fontSize = "14px";
//   colorText.style.borderRadius = "5px";
//   colorText.style.padding = "5px";
//   colorText.style.background = "black";
//   colorText.style.color = "white";
//   colorText.style.position = "absolute";
//   colorText.style.bottom = "0"; // Position at the bottom of the image
//   imageContainer.appendChild(colorText);

//   // Append the image container to the product summary
//   productSummary.appendChild(imageContainer);

//   // Add the product price after the image, size, and color
//   const priceText = document.createElement("h3");
//   priceText.innerText = `Price: ${productPrice}`;
//   priceText.style.margin = "0";
//   priceText.style.fontSize = "12px";
//   priceText.style.fontWeight = "thin";
//   priceText.style.color = "#333";
//   productSummary.appendChild(priceText);

//   // Append the product summary to the form
//   form.appendChild(productSummary);

//   // Add input fields
//   const nameInput = createInput("text", "name", "Enter your name");
//   const phoneInput = createInput("tel", "phone", "Enter your phone number");
//   const secondPhoneInput = createInput(
//     "tel",
//     "secondPhone",
//     "Enter a second phone number (optional)"
//   );

//   // Add a textarea for the address
//   const addressTextArea = createTextArea("address", "Enter your address");

//   // Add a textarea for order notes (optional)
//   const orderNotesTextArea = createTextArea(
//     "orderNotes",
//     "Add any additional notes or special instructions (optional)"
//   );

//   // Add a submit button
//   const submitButton = document.createElement("button");
//   submitButton.classList.add("placeorderbtn");
//   submitButton.type = "submit";
//   submitButton.innerText = "Place order";

//   // Append inputs and buttons to the form
//   form.appendChild(nameInput);
//   form.appendChild(phoneInput);
//   form.appendChild(secondPhoneInput);
//   form.appendChild(addressTextArea);
//   form.appendChild(orderNotesTextArea);
//   form.appendChild(submitButton);

//   // Handle form submission
//   form.onsubmit = async function (event) {
//     event.preventDefault(); // Prevent form submission

//     // Check if required fields are filled
//     if (!nameInput.value || !phoneInput.value || !addressTextArea.value) {
//       alert("Please fill out all required fields: Name, Phone, and Address.");
//       return;
//     }

//     // Get form data
//     const formData = {
//       name: nameInput.value,
//       phone: phoneInput.value,
//       secondPhone: secondPhoneInput.value || "N/A",
//       address: addressTextArea.value,
//       orderNotes: orderNotesTextArea.value || "N/A",
//     };

//     // Get product details
//     const brandName = document.getElementById("BrandName").innerText;
//     const productTitle = document.getElementById("productTitle").innerText;
//     const productPrice = document.getElementById("productPrice").innerText;
//     const productSize = document.getElementById("product-Size").innerText;
//     const productColor = document.getElementById("product-color").innerText;
//     const productID = document.getElementById("productID").innerText;
//     const productImage = document.getElementById("productImage").src;

//     // Prepare order data
//     const order = {
//       Customeruid: "Guest User", // Replace with actual customer UID
//       Date: formattedDate,
//       cart: [
//         {
//           brand: brandName,
//           id: productID,
//           photourl: productImage,
//           price: productPrice,
//           productColor: productColor,
//           productSize: productSize,
//           quantity: 1,
//           title: productTitle,
//         },
//       ],
//       payment: "N/A",
//       personal_info: {
//         address: formData.address,
//         name: formData.name,
//         phone: formData.phone,
//         phone2: formData.secondPhone,
//       },
//       shippingFees: 85, // Set shipping fees to 85
//     };

//     try {
//       // Sign in the guest user programmatically
//       const email = "hancockstoreguest@gmail.com";
//       const password = "hancockstoreguest@gmail.com"; // Replace with the actual password

//       const userCredential = await firebase
//         .auth()
//         .signInWithEmailAndPassword(email, password);

//       // Get the ID token
//       const idToken = await userCredential.user.getIdToken();

//       // Push order data to the server
//       const orderResponse = await fetch(
//         `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(order),
//         }
//       );

//       if (!orderResponse.ok) {
//         throw new Error("Failed to place the order.");
//       }

//       // Show a success message
//       alert("Order placed successfully!");
//     } catch (error) {
//       console.error("Error:", error);
//       alert("An error occurred while placing the order. Please try again.");
//     }
//   };

//   // Append the form to the body
//   document.body.appendChild(form);
// }

// // Function to create an input field
// function createInput(type, id, placeholder) {
//   const input = document.createElement("input");
//   input.type = type;
//   input.id = id;
//   input.placeholder = placeholder;
//   input.style.padding = "10px";
//   input.style.border = "1px solid #ccc";
//   input.style.borderRadius = "5px";
//   return input;
// }

// // Function to create a textarea field
// function createTextArea(id, placeholder) {
//   const textarea = document.createElement("textarea");
//   textarea.classList.add("input");
//   textarea.id = id;
//   textarea.placeholder = placeholder;
//   textarea.style.maxWidth = "375px";
//   textarea.style.width = "-webkit-fill-available";
//   textarea.style.background = "none";
//   textarea.style.color = "#333";
//   textarea.style.fontFamily = "inherit";
//   textarea.style.fontSize = "medium";
//   textarea.style.padding = "10px";
//   textarea.style.border = "1px solid #ccc";
//   textarea.style.borderRadius = "5px";
//   textarea.style.resize = "vertical"; // Allow vertical resizing
//   textarea.style.minHeight = "100px"; // Set a minimum height
//   return textarea;
// }
async function handleBuyNowClick() {
  // Get product details
  const brandName = document.getElementById("BrandName").innerText;
  const productTitle = document.getElementById("productTitle").innerText;
  const productPrice = document.getElementById("productPrice").innerText;
  const productSize = document.getElementById("product-Size").innerText;
  const productColor = document.getElementById("product-color").innerText;
  const productID = document.getElementById("productID").innerText;

  // Show the form to collect user details
  showUserForm();
}

// Function to show the user form
function showUserForm() {
  // Smoothly scroll to the top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  // Create a form element
  const form = document.createElement("form");
  form.classList.add("BuyItNowForm");

  // Get product details
  const productImage = document.getElementById("productImage").src;
  const productSize = document.getElementById("product-Size").innerText;
  const productColor = document.getElementById("product-color").innerText;
  const productPrice = document.getElementById("productPrice").innerText;

  // Create a container for the product summary
  const productSummary = document.createElement("div");
  productSummary.style.display = "flex";
  productSummary.style.alignItems = "center";
  productSummary.style.gap = "10px";
  productSummary.style.marginBottom = "20px";
  productSummary.style.flexDirection = "column"; // Stack items vertically

  // Create a container for the product image with a size badge
  const imageContainer = document.createElement("div");
  imageContainer.style.position = "relative"; // For absolute positioning of the badge

  // Add the product image
  const productImageElement = document.createElement("img");
  productImageElement.src = productImage;
  productImageElement.style.width = "100px";
  productImageElement.style.height = "100px";
  productImageElement.style.borderRadius = "5px";
  productImageElement.style.objectFit = "cover";
  productImageElement.style.margin = "20px"; // Add margin around the image
  imageContainer.appendChild(productImageElement);

  // Add the size badge
  const sizeBadge = document.createElement("p");
  sizeBadge.innerText = productSize;
  sizeBadge.style.color = "white";
  sizeBadge.style.backgroundColor = "black";
  sizeBadge.style.borderRadius = "5px";
  sizeBadge.style.padding = "5px";
  sizeBadge.style.position = "absolute";
  sizeBadge.style.top = "0";
  sizeBadge.style.width = "fit-content";
  sizeBadge.style.margin = "0";
  sizeBadge.style.fontSize = "14px";
  imageContainer.appendChild(sizeBadge);

  // Add the product color
  const colorText = document.createElement("p");
  colorText.innerText = `${productColor}`;
  colorText.style.margin = "0";
  colorText.style.fontSize = "14px";
  colorText.style.borderRadius = "5px";
  colorText.style.padding = "5px";
  colorText.style.background = "black";
  colorText.style.color = "white";
  colorText.style.position = "absolute";
  colorText.style.bottom = "0"; // Position at the bottom of the image
  imageContainer.appendChild(colorText);

  // Append the image container to the product summary
  productSummary.appendChild(imageContainer);

  // Add the product price after the image, size, and color
  const priceText = document.createElement("h3");
  priceText.innerText = `Price: ${productPrice}`;
  priceText.style.margin = "0";
  priceText.style.fontSize = "12px";
  priceText.style.fontWeight = "thin";
  priceText.style.color = "#333";
  productSummary.appendChild(priceText);

  // Append the product summary to the form
  form.appendChild(productSummary);

  // Add input fields
  const nameInput = createInput("text", "name", "Enter your name");
  const phoneInput = createInput("tel", "phone", "Enter your phone number");
  const secondPhoneInput = createInput(
    "tel",
    "secondPhone",
    "Enter a second phone number (optional)"
  );

  // Add a textarea for the address
  const addressTextArea = createTextArea("address", "Enter your address");

  // Add a textarea for order notes (optional)
  const orderNotesTextArea = createTextArea(
    "orderNotes",
    "Add any additional notes or special instructions (optional)"
  );

  // Add a submit button
  const submitButton = document.createElement("button");
  submitButton.classList.add("placeorderbtn");
  submitButton.type = "submit";
  submitButton.innerText = "Place order";

  // Append inputs and buttons to the form
  form.appendChild(nameInput);
  form.appendChild(phoneInput);
  form.appendChild(secondPhoneInput);
  form.appendChild(addressTextArea);
  form.appendChild(orderNotesTextArea);
  form.appendChild(submitButton);

  // Handle form submission
  form.onsubmit = async function (event) {
    event.preventDefault(); // Prevent form submission

    // Check if required fields are filled
    if (!nameInput.value || !phoneInput.value || !addressTextArea.value) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill out all required fields: Name, Phone, and Address.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
      return;
    }

    // Show preloader in the button
    submitButton.innerHTML = `<div class="preloader" id="preloader"> <div class="loader"></div></div>`;
    submitButton.disabled = true;

    // Get form data
    const formData = {
      name: nameInput.value,
      phone: phoneInput.value,
      secondPhone: secondPhoneInput.value || "N/A",
      address: addressTextArea.value,
      orderNotes: orderNotesTextArea.value || "N/A",
    };

    // Get product details
    const brandName = document.getElementById("BrandName").innerText;
    const productTitle = document.getElementById("productTitle").innerText;
    const productPrice = document.getElementById("productPrice").innerText;
    const productSize = document.getElementById("product-Size").innerText;
    const productColor = document.getElementById("product-color").innerText;
    const productID = document.getElementById("productID").innerText;
    const productImage = document.getElementById("productImage").src;

    // Prepare order data
    const order = {
      Customeruid: "Guest User", // Replace with actual customer UID
      Date: new Date().toISOString(),
      cart: [
        {
          brand: brandName,
          id: productID,
          photourl: productImage,
          price: productPrice,
          productColor: productColor,
          productSize: productSize,
          quantity: 1,
          title: productTitle,
        },
      ],
      payment: "N/A",
      personal_info: {
        address: formData.address,
        name: formData.name,
        phone: formData.phone,
        phone2: formData.secondPhone,
      },
      shippingFees: 85, // Set shipping fees to 85
    };

    try {
      // Sign in the guest user programmatically
      const email = "hancockstoreguest@gmail.com";
      const password = "hancockstoreguest@gmail.com"; // Replace with the actual password

      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);

      // Get the ID token
      const idToken = await userCredential.user.getIdToken();

      // Push order data to the server
      const orderResponse = await fetch(
        `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(order),
        }
      );

      if (!orderResponse.ok) {
        throw new Error("Failed to place the order.");
      }

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Order Placed!",
        text: "Your order has been placed successfully.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });

      // Remove the form from the DOM
      form.remove();

      // Log out the guest user
      await firebase.auth().signOut();
      console.log("Guest user logged out successfully.");
    } catch (error) {
      console.error("Error:", error);

      // Show error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An error occurred while placing the order. Please try again.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      // Reset the button text and enable it
      submitButton.innerHTML = "Place order";
      submitButton.disabled = false;
    }
  };

  // Append the form to the body
  document.body.appendChild(form);
}

// Function to create an input field
function createInput(type, id, placeholder) {
  const input = document.createElement("input");
  input.type = type;
  input.id = id;
  input.placeholder = placeholder;
  input.style.padding = "10px";
  input.style.border = "1px solid #ccc";
  input.style.borderRadius = "5px";
  return input;
}

// Function to create a textarea field
function createTextArea(id, placeholder) {
  const textarea = document.createElement("textarea");
  textarea.classList.add("input");
  textarea.id = id;
  textarea.placeholder = placeholder;
  textarea.style.maxWidth = "375px";
  textarea.style.width = "-webkit-fill-available";
  textarea.style.background = "none";
  textarea.style.color = "#333";
  textarea.style.fontFamily = "inherit";
  textarea.style.fontSize = "medium";
  textarea.style.padding = "10px";
  textarea.style.border = "1px solid #ccc";
  textarea.style.borderRadius = "5px";
  textarea.style.resize = "vertical"; // Allow vertical resizing
  textarea.style.minHeight = "100px"; // Set a minimum height
  return textarea;
}
