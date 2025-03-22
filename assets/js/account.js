function editPersonalInfo() {
  const firstNameElem = document.getElementById("first-name");
  const lastNameElem = document.getElementById("last-name");
  const phoneNumberElem = document.getElementById("phone-number");
  const phoneNumber2Elem = document.getElementById("phone-number2");

  // Check if inputs are already displayed, if yes, return to the base (text)
  if (firstNameElem.tagName === "INPUT") {
    // Cancel the edit and revert to the original text values
    firstNameElem.outerHTML = `<p id="first-name">${firstNameElem.value}</p>`;
    lastNameElem.outerHTML = `<p id="last-name">${lastNameElem.value}</p>`;
    phoneNumberElem.outerHTML = `<p id="phone-number">${phoneNumberElem.value}</p>`;
    phoneNumber2Elem.outerHTML = `<p id="phone-number2">${phoneNumber2Elem.value}</p>`;

    // Hide the save button again
    document.getElementById("savepersonalinfochanges").classList.add("hidden");
  } else {
    // Convert displayed info to editable inputs, preserving current values
    const firstName = firstNameElem.textContent.trim();
    const lastName = lastNameElem.textContent.trim();
    const phoneNumber = phoneNumberElem.textContent.trim();
    const phoneNumber2 = phoneNumber2Elem.textContent.trim();

    firstNameElem.outerHTML = `<input type="text" id="first-name" value="${firstName}">`;
    lastNameElem.outerHTML = `<input type="text" id="last-name" value="${lastName}">`;
    phoneNumberElem.outerHTML = `<input type="tel" id="phone-number" value="${phoneNumber}">`;
    phoneNumber2Elem.outerHTML = `<input type="tel" id="phone-number2" value="${phoneNumber2}">`;

    // Remove the 'hidden' class to show the save button
    document
      .getElementById("savepersonalinfochanges")
      .classList.remove("hidden");
  }
}

// Function to save user data
// function savepersonalinfochanges(uid) {
//   console.log(uid);

//   // Ensure the user is authenticated first
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       user
//         .getIdToken(true) // Get the ID token securely
//         .then((idToken) => {
//           const url = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}.json?auth=${idToken}`;

//           // Collect form input values
//           const firstName = document.getElementById("first-name").value;
//           const lastName = document.getElementById("last-name").value;
//           const phoneNumber = document.getElementById("phone-number").value;
//           const phoneNumber2 = document.getElementById("phone-number2").value;

//           // Validate the required fields

//           const userData = {
//             personalInfo: {
//               firstName,
//               lastName,
//               phone: phoneNumber,
//               phone2: phoneNumber2,
//             },
//           };

//           fetch(url, {
//             method: "PUT", // Change to PUT for updating
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(userData),
//           })
//             .then((response) => {
//               if (!response.ok) {
//                 throw new Error("Failed to update user information.");
//               }
//               return response.json();
//             })
//             .then(() => {
//               Swal.fire({
//                 icon: "success",
//                 title: "Success",
//                 text: "User information updated successfully!",
//                 timer: 1500,
//                 showConfirmButton: false,
//               });
//             })
//             .catch((error) => {
//               console.error("Error updating user data:", error);

//               Swal.fire({
//                 icon: "error",
//                 title: "Update Failed",
//                 text: "Could not save data. Please try again.",
//               });
//             });
//         })
//         .catch((error) => {
//           console.error("Error retrieving ID token:", error);

//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Failed to retrieve authentication token. Please try again.",
//           });
//         });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "No authenticated user found. Please log in.",
//       });
//     }
//   });
// }

function AddAddress() {
  const noaddressesmessage = document.getElementById("no-address-container");
  const addressesContainer = document.querySelector(".addresses-container");
  const newAddressDiv = document.createElement("div");
  newAddressDiv.className = "account-section";

  newAddressDiv.innerHTML = `
            <div class="flex align-items justify-content-space-between mb-10">
                <h5>New Address</h5>
                <button class="edit-button" id="Submitnewaddress"
                                onclick="Submitnewaddress()">
                                save changes</button>
            </div>
            <div class="details-row">
                <div class="detail-group">
                    <h6>Governorate</h6>
                    <select id="governorate" style="margin: 0;margin-top: 5px;padding:8;font-size: 12px;" class="swal2-input select-governorate width-available">
        <option value="" disabled selected>Select your governorate</option>
        <option value="Cairo">Cairo</option>
        <option value="Giza">Giza</option>
        <option value="Alexandria">Alexandria</option>
        <option value="Port Said">Port Said</option>
        <option value="Suez">Suez</option>
        <option value="Damietta">Damietta</option>
        <option value="Dakahlia">Dakahlia</option>
        <option value="Sharqia">Sharqia</option>
        <option value="Qalyubia">Qalyubia</option>
        <option value="Kafr El Sheikh">Kafr El Sheikh</option>
        <option value="Gharbia">Gharbia</option>
        <option value="Monufia">Monufia</option>
        <option value="Beheira">Beheira</option>
        <option value="Ismailia">Ismailia</option>
        <option value="Aswan">Aswan</option>
        <option value="Asyut">Asyut</option>
        <option value="Beni Suef">Beni Suef</option>
        <option value="Fayoum">Fayoum</option>
        <option value="Minya">Minya</option>
        <option value="Qena">Qena</option>
        <option value="Sohag">Sohag</option>
        <option value="Red Sea">Red Sea</option>
        <option value="New Valley">New Valley</option>
        <option value="Matruh">Matruh</option>
        <option value="North Sinai">North Sinai</option>
        <option value="South Sinai">South Sinai</option>
        <option value="Luxor">Luxor</option>
      </select>
                </div>
                <div class="detail-group">
                    <h6>City/State</h6>
                    <input type="text" placeholder="Enter City/State">
                </div>
            </div>
            <div class="details-row">
                <div class="detail-group">
                    <h6>Area</h6>
                    <input type="text" placeholder="Enter Area">
                </div>
                <div class="detail-group">
                    <h6>House-Number</h6>
                    <input type="text" placeholder="Enter House Number">
                </div>
            </div>
            <div class="details-row">
                <div class="detail-group">
                    <h6>Address</h6>
                    <input type="text" placeholder="Enter Address">
                </div>
            </div>
        `;

  addressesContainer.appendChild(newAddressDiv);
  noaddressesmessage.classList.add("hidden");
}

function delAddress(addressId) {
  // Check if the address ID is provided
  if (!addressId) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Invalid address. Cannot delete.",
    });
    return;
  }

  // Get the authenticated user's UID and ID token
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid; // Get the user's UID
      user
        .getIdToken(true) // Retrieve the user's ID token
        .then((idToken) => {
          // Database URL for the specific address
          const dbAddressUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/address/${addressId}.json?auth=${idToken}`;

          // Confirm deletion using Swal
          Swal.fire({
            title: "Are you sure?",
            text: "This action cannot be undone!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              // Delete the address from Firebase
              fetch(dbAddressUrl, {
                method: "DELETE",
              })
                .then((response) => {
                  if (response.ok) {
                    Swal.fire({
                      icon: "success",
                      title: "Deleted!",
                      text: "Address deleted successfully.",
                      timer: 1500,
                      showConfirmButton: false,
                    }).then(() => {
                      // Reload the page after successful deletion
                      location.reload();
                    });
                  } else {
                    Swal.fire({
                      icon: "error",
                      title: "Error",
                      text: "Failed to delete address.",
                    });
                  }
                })
                .catch((error) => {
                  console.error("Error deleting address:", error);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "An error occurred. Please try again.",
                  });
                });
            }
          });
        })
        .catch((error) => {
          console.error("Error retrieving ID token:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to retrieve authentication token. Please try again.",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No authenticated user found. Please log in.",
      });
    }
  });
}

// function Submitnewaddress() {
//   // Get the authenticated user's UID and ID token
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       const uid = user.uid; // Get the user's UID
//       user
//         .getIdToken(true) // Retrieve the user's ID token
//         .then((idToken) => {
//           // Base database URL for addresses
//           const dbAddressUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/address.json?auth=${idToken}`;

//           // Collect input values
//           const governorate = document.querySelector(
//             "input[placeholder='Enter Governorate']"
//           ).value;
//           const city = document.querySelector(
//             "input[placeholder='Enter City/State']"
//           ).value;
//           const area = document.querySelector(
//             "input[placeholder='Enter Area']"
//           ).value;
//           const houseNumber = document.querySelector(
//             "input[placeholder='Enter House Number']"
//           ).value;
//           const fullAddress = document.querySelector(
//             "input[placeholder='Enter Address']"
//           ).value;

//           // Validate inputs
//           if (!governorate || !city || !area || !houseNumber || !fullAddress) {
//             Swal.fire({
//               icon: "error",
//               title: "Error",
//               text: "All fields are required. Please fill out all fields.",
//             });
//             return;
//           }

//           const newAddress = {
//             area: area,
//             city: city,
//             fullAddress: fullAddress,
//             governorate: governorate,
//             houseNumber: houseNumber,
//           };

//           // Push the new address to Firebase
//           fetch(dbAddressUrl, {
//             method: "POST", // POST allows Firebase to auto-generate a key
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(newAddress),
//           })
//             .then((response) => {
//               if (response.ok) {
//                 Swal.fire({
//                   icon: "success",
//                   title: "Success",
//                   text: "Address added successfully!",
//                   timer: 1500,
//                   showConfirmButton: false,
//                 }).then(() => {
//                   // Reload the page after successful addition
//                   location.reload();
//                 });
//               } else {
//                 Swal.fire({
//                   icon: "error",
//                   title: "Error",
//                   text: "Failed to add address. Please try again.",
//                 });
//               }
//             })
//             .catch((error) => {
//               console.error("Error adding address:", error);
//               Swal.fire({
//                 icon: "error",
//                 title: "Error",
//                 text: "An error occurred. Please try again.",
//               });
//             });
//         })
//         .catch((error) => {
//           console.error("Error retrieving ID token:", error);
//           Swal.fire({
//             icon: "error",
//             title: "Error",
//             text: "Failed to retrieve authentication token. Please try again.",
//           });
//         });
//     } else {
//       Swal.fire({
//         icon: "error",
//         title: "Error",
//         text: "No authenticated user found. Please log in.",
//       });
//     }
//   });
// }

function Submitnewaddress() {
  // Get the authenticated user's UID and ID token
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      const uid = user.uid; // Get the user's UID
      user
        .getIdToken(true) // Retrieve the user's ID token
        .then((idToken) => {
          // Base database URL for addresses
          const dbAddressUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${uid}/address.json?auth=${idToken}`;

          // Collect input values
          const governorate =
            document.querySelector("select#governorate").value;
          const city = document
            .querySelector("input[placeholder='Enter City/State']")
            .value.trim();
          const area = document
            .querySelector("input[placeholder='Enter Area']")
            .value.trim();
          const houseNumber = document
            .querySelector("input[placeholder='Enter House Number']")
            .value.trim();
          const fullAddress = document
            .querySelector("input[placeholder='Enter Address']")
            .value.trim();

          // Validate inputs
          if (!governorate || !city || !area || !houseNumber || !fullAddress) {
            Swal.fire({
              icon: "info", // Uses "info" to indicate it's a helpful reminder
              title: "Please Complete All Fields",
              text: "All Address fields are required.",
            });
            return;
          }

          // Create a new address object
          const newAddress = {
            governorate: governorate,
            city: city,
            area: area,
            houseNumber: houseNumber,
            fullAddress: fullAddress,
          };

          // Push the new address to Firebase
          fetch(dbAddressUrl, {
            method: "POST", // POST allows Firebase to auto-generate a key
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newAddress),
          })
            .then((response) => {
              if (response.ok) {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Address added successfully!",
                  timer: 1500,
                  showConfirmButton: false,
                }).then(() => {
                  // Reload the page after successful addition
                  location.reload();
                });
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Failed to add address. Please try again.",
                });
              }
            })
            .catch((error) => {
              console.error("Error adding address:", error);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "An error occurred. Please try again.",
              });
            });
        })
        .catch((error) => {
          console.error("Error retrieving ID token:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to retrieve authentication token. Please try again.",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No authenticated user found. Please log in.",
      });
    }
  });
}
