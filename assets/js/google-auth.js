// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDss53pHibCpqo87_1bhoUHkf8Idnj-Fig",
  authDomain: "matager-f1f00.firebaseapp.com",
  projectId: "matager-f1f00",
  storageBucket: "matager-f1f00.appspot.com",
  messagingSenderId: "922824110897",
  appId: "1:922824110897:web:b7978665d22e2d652e7610",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google Provider
const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
provider.setCustomParameters({
  login_hint: "user@example.com",
});

// v2
document.getElementById("google-signin-btn").addEventListener("click", () => {
  auth
    .signInWithPopup(provider)
    .then(async (result) => {
      const user = result.user;
      console.log("User signed in:", user);

      // Get the ID token for authentication
      const idToken = await user.getIdToken();

      // Create or update the user's record in the Realtime Database
      const userData = {
        personalInfo: {
          email: user.email,
          displayName: user.displayName || "Google User",
          phone: user.phoneNumber || null,
          photoURL: user.photoURL || "https://i.imgur.com/Zaneuop.png",
        },
        orders: [],
        favorites: [],
      };

      const uid = user.uid;
      const databaseUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}.json?auth=${idToken}`;

      // Check if the user already exists in the database
      fetch(databaseUrl)
        .then((response) => response.json())
        .then((existingData) => {
          if (!existingData) {
            // User doesn't exist, create a new record
            return fetch(databaseUrl, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });
          }
          console.log("User already exists in the database.");
        })
        .then(() => {
          Swal.fire("Logged in!", "You are now signed in.", "success");
          updateUI(user); // Update UI with user info
        })
        .catch((error) => {
          console.error("Error during database operation:", error);
          Swal.fire("Error", error.message, "error");
        });
    })
    .catch((error) => {
      console.error("Error during sign-in:", error);
      Swal.fire("Error", error.message, "error");
    });
});

// Sign out
document.getElementById("signout-btn").addEventListener("click", () => {
  auth.signOut().then(() => {
    console.log("User signed out");
    Swal.fire({
      title: "Logged out!",
      text: "You have been signed out.",
      icon: "success",
    }).then(() => {
      location.reload(); // Reload the page after clicking OK
    });
    updateUI(null); // Hide signout button and user info
  });
});

auth.onAuthStateChanged((user) => {
  if (user) {
    updateUI(user); // Update UI with user data
    // Hide the "Sign in" button if user is already authenticated
    document.getElementById("google-signin-btn").style.display = "none";
    document.getElementById("email-signin-btn").style.display = "none";
    document.getElementById("sign-in-by-matager").classList.add("hidden");
    document.getElementById("powerd-by-matager").classList.remove("end-page");
    document.getElementById("signout-btn").style.display = "block";
  } else {
    console.log("No user is signed in.");
    updateUI(null); // Hide user info
    document.getElementById("google-signin-btn").style.display = "block";
    document.getElementById("email-signin-btn").style.display = "block";
    document.getElementById("signout-btn").style.display = "none";
  }
});

// Call the render function after data is fetched

async function updateUI(user) {
  // Show the preloader initially
  document.getElementById("preloader").style.display = "flex";

  if (user) {
    const uid = user.uid; // Get the authenticated user's UID
    const token = await user.getIdToken();
    const baseUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}`;

    // Fetch personalInfo, address, orderHistory, and favouriteItems
    Promise.all([
      fetch(`${baseUrl}/personalInfo.json`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch personalInfo.");
        return response.json();
      }),
      fetch(`${baseUrl}/address.json`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch address.");
        return response.json();
      }),
      fetch(`${baseUrl}/orderHistory/${storeuid}.json`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch order history.");
        return response.json();
      }),
      fetch(`${baseUrl}/favouriteitems/${storeuid}.json`).then((response) => {
        if (!response.ok) throw new Error("Failed to fetch favourite items.");
        return response.json();
      }),
    ])
      .then(
        ([
          personalInfoData,
          addressData,
          orderHistoryData,
          favouriteItemsData,
        ]) => {
          const personalInfo = Object.values(personalInfoData || {})[0] || {};
          const allAddresses = addressData || {};
          const orderHistory = orderHistoryData || {};
          const favouriteItems = favouriteItemsData || {};

          const email = user.email || "No Email";
          const username =
            `${personalInfo.firstName || ""} ${
              personalInfo.lastName || ""
            }`.trim() || "No Username";
          const photoURL =
            personalInfo.photoURL || "https://i.imgur.com/Zaneuop.png";
          const role = personalInfo.role || "Customer";
          const firstName = personalInfo.firstName || "";
          const lastName = personalInfo.lastName || "";
          const phone = personalInfo.phone || "No Phone Number";
          const phone2 = personalInfo.phone2 || "No Phone Number";

          // Hide the preloader once data is fetched
          document.getElementById("preloader").style.display = "none";

          document.getElementById("google-signin-btn").style.display = "none";
          document.getElementById("signout-btn").style.display = "block";
          document.getElementById("user-info").style.display = "block";

          // Populate user information in UI
          document.getElementById("user-name").innerText = username;
          document.getElementById(
            "user-email"
          ).innerHTML = `<i class="fa-solid fa-envelope mr-5"></i> ${email}`;
          document.getElementById("UID").innerText = user.uid;
          document.getElementById("email-address").innerText = email;
          document.getElementById("first-name").innerText = firstName;
          document.getElementById("last-name").innerText = lastName;
          document.getElementById("role").innerText = role;
          document.getElementById("phone-number").innerText = phone;
          document.getElementById("phone-number2").innerText = phone2;
          document.getElementById("user-photo").src = photoURL;

          // Add the edit user personal info logic with updated UID
          const saveChangesButton = document.getElementById(
            "savepersonalinfochanges"
          );
          saveChangesButton.setAttribute(
            "onclick",
            `savepersonalinfochanges('${uid}')`
          );

          const addressesContainer = document.querySelector(
            ".addresses-container"
          );
          addressesContainer.innerHTML = ""; // Clear previous addresses

          if (!allAddresses || Object.keys(allAddresses).length === 0) {
            const noAddressDiv = `
            <div id="no-address-container" class="no-address-container">
              <p>No address yet. Try adding one!</p>
            </div>
          `;
            addressesContainer.insertAdjacentHTML("beforeend", noAddressDiv);
          } else {
            Object.entries(allAddresses).forEach(([id, address]) => {
              const addressHTML = `
              <div class="account-section">
                <div class="flex justify-content-flex-end mb-10">
                  <div class="flex align-items">
                    <button class="edit-button mr-5 mb-10" onclick="delAddress('${id}')">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
                <div class="details-row">
                  <div class="detail-group">
                    <h6>Governorate</h6>
                    <p>${address.governorate || "No Governorate"}</p>
                  </div>
                  <div class="detail-group">
                    <h6>City/State</h6>
                    <p>${address.city || "No City"}</p>
                  </div>
                </div>
                <div class="details-row">
                  <div class="detail-group">
                    <h6>Area</h6>
                    <p>${address.area || "No Area"}</p>
                  </div>
                  <div class="detail-group">
                    <h6>House-Number</h6>
                    <p>${address.houseNumber || "No House Number"}</p>
                  </div>
                </div>
                <div class="details-row">
                  <div class="detail-group">
                    <h6>Address</h6>
                    <p>${address.fullAddress || "No Full Address"}</p>
                  </div>
                </div>
              </div>
            `;
              addressesContainer.insertAdjacentHTML("beforeend", addressHTML);
            });
          }

          const renderOrderHistory = () => {
            const orderHistoryGrid = document.querySelector(
              ".order-history-grid"
            );
            orderHistoryGrid.innerHTML = ""; // Clear previous content

            if (!orderHistory || Object.keys(orderHistory).length === 0) {
              // Append a message if no orders are found
              const noOrdersMessage = `
              <div class="no-orders-container">
                <p>No orders yet. Start shopping to see your orders here!</p>
              </div>
            `;
              orderHistoryGrid.insertAdjacentHTML("beforeend", noOrdersMessage);
              return; // Exit the function
            }

            const orderEntries = Object.entries(orderHistory).reverse(); // Reverse the order

            orderEntries.forEach(([key, orderData]) => {
              // Normalize and ensure default values for progress and shippingStatus
              const progress =
                orderData.progress?.trim().toLowerCase() || "unknown";
              const shippingStatus = orderData.shippingstatus
                ?.trim()
                .toLowerCase();

              // Initialize step classes and progress bars
              let step1Class = "";
              let step2Class = "";
              let step3Class = "";
              let bar1Class = "";
              let bar2Class = "";

              // Initialize a flag to determine if the progress container should be hidden
              let hideProgressContainer = false;

              // Check if we need to hide the progress container
              if (shippingStatus === "returned" || progress === "pending") {
                hideProgressContainer = true;
              } else if (!shippingStatus) {
                // If shippingStatus is undefined, mark only "Order Preparing" as active
                step1Class = "active";
              } else {
                // Determine the active steps and bars based on progress and shippingStatus
                switch (shippingStatus) {
                  case "shipped":
                    step1Class = "active";
                    step2Class = "active";
                    bar1Class = "active";
                    break;
                  case "delivered":
                    step1Class = "active";
                    step2Class = "active";
                    step3Class = "active";
                    bar1Class = "active";
                    bar2Class = "active";
                    break;
                  default:
                    console.warn(
                      `Unrecognized shippingStatus for order ${key}: ${shippingStatus}`
                    );
                    break;
                }
              }

              // Start building the order card
              let orderCardHTML = `
    <div class="order-card">
      ${
        hideProgressContainer
          ? ""
          : `<div id="progress-container">
              <!-- Step 1 -->
              <div class="progress-step ${step1Class}" title="Order Preparing" id="step-1">
                <i class="fa-solid fa-boxes-packing"></i>
              </div>
              <!-- Progress bar -->
              <div class="progress-bar-status ${bar1Class}" id="bar-1"></div>
              <!-- Step 2 -->
              <div class="progress-step ${step2Class}" title="Out for Delivery" id="step-2">
                <i class="fa-solid fa-parachute-box"></i>
              </div>
              <!-- Progress bar -->
              <div class="progress-bar-status ${bar2Class}" id="bar-2"></div>
              <!-- Step 3 -->
              <div class="progress-step ${step3Class}" title="Delivered" id="step-3">
                <i class="fa-solid fa-box"></i>
              </div>
            </div>`
      }

      <div class="order-header gap-10">
        <h5 class="flex"><p>${key}</p></h5>
        <div class="flex align-items gap-10">
          <span class="status ${
            shippingStatus || orderData.progress.toLowerCase()
          }">${shippingStatus ? shippingStatus : orderData.progress}</span>
          <span class="payment-card">${orderData.payment}</span>
        </div>
      </div>

      <div class="order-details">
  `;

              // Loop through all items in the `order` array
              orderData.order.forEach((item) => {
                orderCardHTML += `
      <div class="order-item">
        <div class="img-container">
          <img src="${item.photo}" alt="${item.title}">
          <div class="qty-circle">${item.qty || 0}</div>
        </div>
        <span>${item.title || "Unknown"}</span>
        <span>${
          (parseFloat(item.price) * parseInt(item.qty || 0)).toFixed(2) ||
          "Unknown"
        }</span>
      </div>
    `;
              });

              // Close the order-details and add actions
              orderCardHTML += `
    </div>
    <div class="order-actions">
      <button onclick="printinvoice('${key}', '${uid}', '${token}')" class="btn-view">Print Invoice</button>
    </div>
  </div>
  `;

              // Append the order card to the grid
              orderHistoryGrid.insertAdjacentHTML("beforeend", orderCardHTML);
            });
          };

          renderOrderHistory();

          // Render Favourite Items
          const renderFavouriteItems = () => {
            const favouriteItemsContainer =
              document.getElementById("favourite-items");
            favouriteItemsContainer.innerHTML = ""; // Clear previous content

            if (!favouriteItems || Object.keys(favouriteItems).length === 0) {
              const noFavouritesMessage = `
              <div class="no-favourites-container">
                <p>No favourite items yet. Start exploring and add your favourites!</p>
              </div>
            `;
              favouriteItemsContainer.insertAdjacentHTML(
                "beforeend",
                noFavouritesMessage
              );
              return;
            }

            Object.entries(favouriteItems)
              .reverse() // Reverse the order
              .forEach(([id, item]) => {
                const favouriteItemHTML = `
      <div class="favourite-item favourite-section">
        <div class="img-container">
          <img src="${item.photo}" alt="${
                  item.title
                }" onclick="productDetails('${item.productid}')">
          <div class="qty-circle remove-fav-item" onclick="removeFavourite('${id}', '${token}', '${uid}')">
              <i class="bi bi-heartbreak-fill"></i>
          </div>
        </div>
        <div class="item-details">
          <span>${item.title || "Unknown Item"}</span>
          <span>${item.color || "N/A"}-${item.size || "N/A"}</span>
        </div>
      </div>
    `;
                favouriteItemsContainer.insertAdjacentHTML(
                  "beforeend",
                  favouriteItemHTML
                );
              });
          };

          renderFavouriteItems();
        }
      )
      .catch((error) => {
        console.error("Error fetching user data:", error);
        document.getElementById("preloader").style.display = "none";
      });
  } else {
    // Hide the preloader if no user is signed in
    document.getElementById("preloader").style.display = "none";
  }
}

function removeFavourite(favproductid, token, userId) {
  // Show SweetAlert confirmation before deleting
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this action!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Firebase reference to the specific favourite item
      const favItemRef = firebase
        .database()
        .ref(`users/${userId}/favouriteitems/${uid}/${favproductid}`);

      // Remove the favourite item
      favItemRef
        .remove()
        .then(() => {
          console.log("Favourite item removed successfully");
          // Optionally, you can remove the item from the UI as well
          const itemElement = document.querySelector(
            `[onclick="productDetails('${favproductid}')"]`
          );
          if (itemElement) {
            itemElement.remove();
          }
          // Show success message
          Swal.fire(
            "Deleted!",
            "Your favourite item has been deleted.",
            "success"
          );
        })
        .catch((error) => {
          console.error("Error removing favourite item: ", error);
          Swal.fire(
            "Error!",
            "There was a problem removing the item.",
            "error"
          );
        });
    }
  });
}

//
// Open the modal when the profile picture is clicked
// Open the modal
function openImageOptions() {
  const modal = document.getElementById("image-options-modal");
  modal.classList.add("show");
}

// Close the modal
function closeModal() {
  const modal = document.getElementById("image-options-modal");
  modal.classList.remove("show");
}

// Close modal if clicked outside the content
function closeModalOnOutsideClick(event) {
  const modalContent = document.querySelector(".modal-content");
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

// Trigger the file input for uploading from the computer
function triggerFileInput() {
  document.getElementById("file-input").click();
}

// Imgur Client ID
const IMGUR_CLIENT_ID = "e855dfc7fb0d876";
let selectedFile = null; // Declare a variable to hold the selected file

// Function to upload image to Imgur
async function uploadImageToImgur(file) {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Imgur upload failed: ${errorData.data.error}`);
    }

    const data = await response.json();
    return data.data.link; // URL of the uploaded image
  } catch (error) {
    console.error("Upload failed:", error);
    throw new Error("Failed to upload image: " + error.message);
  }
}

// Handle the image file selection and preview it
function updateProfilePicture(event) {
  const file = event.target.files[0];
  if (file) {
    selectedFile = file; // Store the file in the global variable

    const objectURL = URL.createObjectURL(file);
    const profileImage = document.getElementById("user-photo");
    const saveChangesButton = document.getElementById("savechanges");

    // Temporarily display the selected image
    profileImage.src = objectURL;
    profileImage.style.objectFit = "cover";

    // Show the Save Changes button
    saveChangesButton.classList.remove("hidden");
  }
}

// Save changes and upload the image to Imgur

async function saveProfilePicture() {
  const saveChangesButton = document.getElementById("savechanges");
  const preloader = document.getElementById("save-btn-preloader");
  const profileImage = document.getElementById("user-photo");

  if (selectedFile) {
    try {
      // Show the preloader and disable the button
      preloader.classList.remove("hidden");
      saveChangesButton.disabled = true;

      // Show a loading indicator (optional)
      saveChangesButton.textContent = "Uploading...";

      // Upload the image to Imgur
      const uploadedImageUrl = await uploadImageToImgur(selectedFile);

      // Update the profile image with the final URL
      profileImage.src = uploadedImageUrl;

      // Reset the button and state
      saveChangesButton.textContent = "Save Changes";
      saveChangesButton.disabled = false;

      // Hide the preloader and the Save Changes button after upload
      preloader.classList.add("hidden");
      saveChangesButton.classList.add("hidden");

      console.log("Image uploaded successfully:", uploadedImageUrl);

      // Show SweetAlert success message and auto-close after 2 seconds
      Swal.fire({
        title: "Image uploaded successfully!",
        icon: "success",
        timer: 2000, // 2 seconds
        showConfirmButton: false, // Hide the confirm button
        willClose: () => {
          // Optional: You can reset the button here or perform other actions after the alert closes
        },
      });
    } catch (error) {
      console.error(error);
      alert("Failed to upload image. Please try again.");
      saveChangesButton.textContent = "Save Changes";
      saveChangesButton.disabled = false;

      // Hide the preloader and show the button again
      preloader.classList.add("hidden");
      saveChangesButton.classList.remove("hidden");
    }
  } else {
  }
}

// Add event listener for the save changes button
document
  .getElementById("savechanges")
  .addEventListener("click", saveProfilePicture);

// Add event listener for the image file input
document
  .getElementById("profile-picture-input") // Assuming the input element has this ID
  .addEventListener("change", updateProfilePicture);

// Update the profile picture using the image URL
function updateProfilePictureFromURL(event) {
  const imageURL = event.target.value;
  const userPhoto = document.getElementById("user-photo");
  const inputField = document.getElementById("image-url-input");
  const uploadimgurlbtn = document.getElementById("upload-img-url");
  const imageError = document.getElementById("image-error");
  const saveChangesButton = document.getElementById("savechanges");

  if (imageURL) {
    // Temporarily set the image source to test if it's valid
    userPhoto.src = imageURL;

    // Reset any previous error state
    userPhoto.onerror = null;
    userPhoto.onload = null;

    // Add an error listener to handle invalid image URLs
    userPhoto.onerror = () => {
      // Reset the error listener immediately to avoid infinite triggers
      userPhoto.onerror = null;

      // Show error message
      imageError.textContent =
        "The image has a problem. Please check the URL and try again.";
      imageError.classList.remove("hidden");

      // Reset fields
      userPhoto.src = "";
      inputField.value = "";
      uploadimgurlbtn.style.display = "none";
      saveChangesButton.classList.add("hidden");
    };

    // Handle successful image loading
    userPhoto.onload = () => {
      // Remove error listener
      userPhoto.onerror = null;

      // Hide error message
      imageError.textContent = "";
      imageError.classList.add("hidden");

      // Show save changes button
      saveChangesButton.classList.remove("hidden");
      saveChangesButton.style.display = "block";

      // Close the modal
      closeModal();
    };
  } else {
    // If the input is empty, reset everything
    userPhoto.src = "";
    uploadimgurlbtn.style.display = "none";
    saveChangesButton.classList.add("hidden");
    imageError.textContent = "";
    imageError.classList.add("hidden");
  }
}

function showImageURLInput() {
  const urlInputContainer = document.getElementById("url-input-container");
  // Toggle visibility
  if (urlInputContainer.style.display === "block") {
    urlInputContainer.style.display = "none"; // Hide if already visible
  } else {
    urlInputContainer.style.display = "block"; // Show if hidden
  }
}
// Button visibility logic
const inputField = document.getElementById("image-url-input");
const uploadimgurlbtn = document.getElementById("upload-img-url");

inputField.addEventListener("input", () => {
  if (inputField.value.trim() !== "") {
    uploadimgurlbtn.style.display = "inline-block"; // Show button
  } else {
    uploadimgurlbtn.style.display = "none"; // Hide button
  }
});

// avatar profile upload
function showAvatars() {
  const avatarContainer = document.getElementById("avatarContainer");
  const avatarCarousel = document.getElementById("avatarCarousel");

  // Unhide the avatar container
  avatarContainer.classList.remove("hidden");

  // Sample avatar images (replace with your image URLs)
  const avatars = [
    "https://i.imgur.com/EefGAr3.jpeg",
    "https://i.imgur.com/w7hc8vE.jpeg",
    "https://i.imgur.com/hCcCj6u.jpeg",
    "https://i.imgur.com/AFiowRw.jpeg",
    "https://i.imgur.com/1YOLQ5r.jpeg",
    "https://i.imgur.com/tRl4D55.jpeg",
    "https://i.imgur.com/sOEhCqO.jpeg",
    "https://i.imgur.com/zyl46kR.jpeg",
    "https://i.imgur.com/uesShn7.jpeg",
    "https://i.imgur.com/psAxQsV.jpeg",
    "https://i.imgur.com/to8D1li.jpeg",
    "https://i.imgur.com/YMuYZoc.jpeg",
    "https://i.imgur.com/FdnaU6t.jpeg",
    "https://i.imgur.com/BnSzooT.jpeg",
    "https://i.imgur.com/sjWGonu.jpeg",
    "https://i.imgur.com/OcxRKDm.jpeg",
    "https://i.imgur.com/0U8t7jQ.jpeg",
  ];

  // Populate the carousel with avatars
  avatarCarousel.innerHTML = avatars
    .map(
      (url, index) =>
        `<img src="${url}" alt="Avatar ${
          index + 1
        }" onclick="selectAvatar(this)">`
    )
    .join("");
}

function selectAvatar(selectedImg) {
  // Remove 'selected' class from previously selected avatars
  document
    .querySelectorAll(".avatar-carousel img")
    .forEach((img) => img.classList.remove("selected"));

  // Add 'selected' class to the clicked avatar
  selectedImg.classList.add("selected");

  // Show the confirm button
  document.getElementById("selectAvatarButton").classList.remove("hidden");
}

function confirmAvatar() {
  const selectedAvatar = document.querySelector(
    ".avatar-carousel img.selected"
  );

  const userPhoto = document.getElementById("user-photo");
  const saveChangesBtn = document.getElementById("savechanges");

  if (!selectedAvatar) {
    alert("Please select an avatar.");
    return;
  }

  userPhoto.src = selectedAvatar.src;
  saveChangesBtn.classList.remove("hidden");
  saveChangesBtn.setAttribute("avatarurl", selectedAvatar.src);

  // Set the uploadAvatar function as the click handler
  saveChangesBtn.onclick = function () {
    uploadAvatar(selectedAvatar.src);
  };

  closeModal();
}
async function uploadAvatar(avatarUrl) {
  const preloader = document.getElementById("save-btn-preloader");
  const saveChangesButton = document.getElementById("savechanges");

  try {
    if (!avatarUrl) {
      throw new Error("No avatar URL found. Please select an avatar.");
    }

    // Show the preloader and disable the button
    preloader.classList.remove("hidden");
    saveChangesButton.disabled = true;
    saveChangesButton.textContent = "Uploading...";

    // Get the user's auth token and UID
    const user = firebase.auth().currentUser;
    if (!user) {
      throw new Error("User not authenticated.");
    }

    const idToken = await user.getIdToken();
    const uid = user.uid;

    // Firebase Realtime Database URL for personal info
    const personalInfoUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/personalInfo.json?auth=${idToken}`;

    // Fetch the user's personal information
    const response = await fetch(personalInfoUrl);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch personal information. Status: ${response.status}`
      );
    }

    const personalInfo = await response.json();

    if (!personalInfo) {
      throw new Error("Personal information not found.");
    }

    // Assuming the user data is stored as individual records,
    // update the 'photoURL' of the user by targeting the user ID
    const userdataId = Object.keys(personalInfo)[0]; // Get the user ID, assuming it's the first key
    const updatedPersonalInfo = {
      ...personalInfo[userdataId], // Copy existing user info
      photoURL: avatarUrl, // Update only the photoURL field
    };

    // Now, update the user's photoURL in the personalInfo
    const updateResponse = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/personalInfo/${userdataId}.json?auth=${idToken}`,
      {
        method: "PUT", // Use PUT to overwrite the specific user's personal info
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedPersonalInfo),
      }
    );

    if (!updateResponse.ok) {
      throw new Error(
        `Failed to update photoURL. Status: ${updateResponse.status}`
      );
    }

    // Display SweetAlert success message and auto-close after a few seconds
    Swal.fire({
      icon: "success",
      title: "Avatar uploaded successfully!",
      showConfirmButton: false,
      timer: 1500, // Close after 1.5 seconds
    });
  } catch (error) {
    console.error("Error in uploadAvatar:", error.message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.message,
    });
  } finally {
    // Hide the preloader and reset the button state
    preloader.classList.add("hidden");
    saveChangesButton.disabled = false;
    saveChangesButton.textContent = "Save Changes";
    saveChangesButton.classList.add("hidden");
  }
}

//
document.addEventListener("DOMContentLoaded", () => {
  // Event delegation for dynamically added progress steps
  document.body.addEventListener("click", (event) => {
    const getImageUrlWithTimestamp = (baseImageUrl) =>
      `${baseImageUrl}?t=${Date.now()}`;

    if (event.target.closest("#step-1")) {
      Swal.fire({
        title: "Order is Preparing",
        text: "Your order is being prepared and will be shipped soon.",
        // imageUrl: getImageUrlWithTimestamp("./assets/images/preparing.svg"), // Add timestamp to URL
        imageUrl: getImageUrlWithTimestamp(
          "https://res.cloudinary.com/dqaz3mxb4/image/upload/v1736950755/Store1/Checking_boxes_s6v3ex.gif"
        ), // Add timestamp to URL
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Preparing Order Image",
        confirmButtonText: "Okay",
      });
    } else if (event.target.closest("#step-2")) {
      Swal.fire({
        title: "Out for Delivery",
        text: "Your order is on the way and will reach you shortly.",
        // imageUrl: getImageUrlWithTimestamp(
        //   "./assets/images/outfordelivery.svg"
        // ), // Add timestamp to URL
        imageUrl: getImageUrlWithTimestamp(
          "https://res.cloudinary.com/dqaz3mxb4/image/upload/v1736950790/Store1/Delivery_unjohz.gif"
        ), // Add timestamp to URL
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Out for Delivery Image",
        confirmButtonText: "Okay",
      });
    } else if (event.target.closest("#step-3")) {
      Swal.fire({
        title: "Order Delivered",
        text: "Your order has been successfully delivered. Thank you!",
        // imageUrl: getImageUrlWithTimestamp("./assets/images/deliverd.svg"), // Add timestamp to URL
        imageUrl: getImageUrlWithTimestamp(
          "https://res.cloudinary.com/dqaz3mxb4/image/upload/v1736950772/Store1/In_no_time_yifqey.gif"
        ),
        imageWidth: 150,
        imageHeight: 150,
        imageAlt: "Delivered Order Image",
        confirmButtonText: "Okay",
      });
    }
  });
});

//

// async function uploadAvatar(avatarUrl) {
//   const preloader = document.getElementById("save-btn-preloader");
//   try {
//     if (!avatarUrl) {
//       throw new Error("No avatar URL found. Please select an avatar.");
//     }

//     // Get the user's auth token and UID
//     const user = firebase.auth().currentUser;
//     if (!user) {
//       throw new Error("User not authenticated.");
//     }

//     const idToken = await user.getIdToken();
//     const uid = user.uid;

//     // Firebase Realtime Database URL for personal info
//     const personalInfoUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/personalInfo.json?auth=${idToken}`;

//     // Fetch the user's personal information
//     const response = await fetch(personalInfoUrl);
//     if (!response.ok) {
//       throw new Error(
//         `Failed to fetch personal information. Status: ${response.status}`
//       );
//     }

//     const personalInfo = await response.json();

//     if (!personalInfo) {
//       throw new Error("Personal information not found.");
//     }

//     // Assuming the user data is stored as individual records,
//     // update the 'photoURL' of the user by targeting the user ID
//     const userdataId = Object.keys(personalInfo)[0]; // Get the user ID, assuming it's the first key
//     const updatedPersonalInfo = {
//       ...personalInfo[userdataId], // Copy existing user info
//       photoURL: avatarUrl, // Update only the photoURL field
//     };

//     // Now, update the user's photoURL in the personalInfo
//     const updateResponse = await fetch(
//       `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/personalInfo/${userdataId}.json?auth=${idToken}`,
//       {
//         method: "PUT", // Use PUT to overwrite the specific user's personal info
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedPersonalInfo),
//       }
//     );

//     if (!updateResponse.ok) {
//       throw new Error(
//         `Failed to update photoURL. Status: ${updateResponse.status}`
//       );
//     }

//     // Display SweetAlert success message and auto-close after a few seconds
//     Swal.fire({
//       icon: "success",
//       title: "Avatar uploaded successfully!",
//       showConfirmButton: false,
//       timer: 1500, // Close after 1.5 seconds
//     });
//   } catch (error) {
//     console.error("Error in uploadAvatar:", error.message);
//     Swal.fire({
//       icon: "error",
//       title: "Oops...",
//       text: error.message,
//     });
//   }
// }

//
async function printinvoice(orderId, userId, userToken) {
  try {
    // Construct the API URL with userId and userToken
    const url = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${userId}/orderHistory/${orderId}.json?auth=${userToken}`;

    // Fetch order details from the API
    const response = await fetch(url);
    const orderData = await response.json();

    if (!orderData || !orderData.order) {
      console.error("Order not found or invalid data.");
      return;
    }

    // Extract the items from the order
    const items = orderData.order;

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add Order ID and Progress
    doc.setFontSize(16);
    doc.text(`Order ID: ${orderId}`, 10, 10);
    doc.text(
      `Progress: ${orderData.progress}, Payment: ${orderData.payment}`,
      10,
      20
    );

    // Add Items Section
    doc.setFontSize(14);
    doc.text("Items:", 10, 30);

    // Configure item layout
    let yPosition = 50;
    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 40;
    const imageHeight = 40;
    const padding = 10;

    for (const item of items) {
      // Fetch item image as Base64
      const imgBase64 = await fetchImageAsBase64(item.photo);

      // Add image
      if (imgBase64) {
        doc.addImage(imgBase64, "JPEG", 10, yPosition, imageWidth, imageHeight);
      }

      const finalprice = parseFloat(item.price) * parseInt(item.qty, 10);

      // Align text with the image
      const xTextStart = 10 + imageWidth + padding; // Text starts after image + padding
      const lineHeight = 8;
      const details = [
        `Title: ${item.title}`,
        `Brand: ${item.brand}`,
        `Size: ${item.size}`,
        `Color: ${item.color}`,
        `Qty: ${item.qty}`,
        `Price: ${finalprice}`,
      ];

      // Add text, line by line, next to the image
      details.forEach((line, index) => {
        doc.text(line, xTextStart, yPosition + index * lineHeight + 5);
      });

      // Move yPosition for the next item
      yPosition += Math.max(imageHeight, details.length * lineHeight) + padding;

      // Add a new page if content exceeds current page height
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20; // Reset yPosition for new page
      }
    }

    // Save the generated PDF
    doc.save(`Order_${orderId}.pdf`);
  } catch (error) {
    console.error("Error printing order:", error);
  }
}
async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

//printing ivoice//
