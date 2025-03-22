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
//
// async function googleSignIn() {
//   const provider = new firebase.auth.GoogleAuthProvider();
//   try {
//     const result = await firebase.auth().signInWithPopup(provider);
//     Swal.fire({
//       icon: "success",
//       title: "Signed in successfully!",
//       showConfirmButton: false,
//       timer: 1500, // Close the alert after 1.5 seconds
//     });
//     return result.user;
//   } catch (error) {
//     console.error("Error signing in:", error);
//     Swal.fire({
//       icon: "error",
//       title: "Sign In Failed",
//       text: "There was a problem signing you in. Please try again!",
//       showConfirmButton: false,
//       timer: 1500, // Close the alert after 1.5 seconds
//     });
//     return null;
//   }
// }
//

//main

// async function submitOrder() {
//   // Show the preloader
//   document.getElementById("preloader").classList.remove("hidden");

//   try {
//     // Ensure the user is signed in and fetch their token
//     const user = firebase.auth().currentUser;
//     if (!user) {
//       document.getElementById("preloader").classList.add("hidden");
//       Swal.fire({
//         icon: "warning",
//         title: "Sign In Required",
//         text: "You must sign in to complete your order.",
//         showCancelButton: true,
//         confirmButtonText: "Go to Account",
//         cancelButtonText: "Cancel",
//         reverseButtons: true,
//       }).then((result) => {
//         if (result.isConfirmed) {
//           window.location.href = "./account.html"; // Redirect to the account page
//         }
//       });
//       return;
//     }

//     const idToken = await user.getIdToken();
//     const Customeruid = user.uid; // Fetch the UID of the logged-in user
//     // Get the cart from local storage
//     let cart = JSON.parse(localStorage.getItem("cart"));
//     if (!cart || cart.length === 0) {
//       document.getElementById("preloader").classList.add("hidden");
//       Swal.fire({
//         icon: "warning",
//         title: "Your cart is empty",
//         text: "Please add items to your cart before placing an order.",
//       });
//       return;
//     }

//     const cartTotalElement = document.getElementById("cart-total");
//     let cartTotal = 0;

//     if (cartTotalElement) {
//       const cartTotalText = cartTotalElement.innerText.match(/\d+/)
//         ? cartTotalElement.innerText.match(/\d+/)[0]
//         : "0";
//       cartTotal = parseInt(cartTotalText, 10);
//     }

//     const unavailableItems = [];
//     const updatedCart = [];

//     for (const item of cart) {
//       // Fetch the product data from Firebase
//       const productResponse = await fetch(
//         `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`
//       );
//       const productData = await productResponse.json();

//       if (!productData) {
//         unavailableItems.push({
//           title: item.title,
//           photourl: item.photourl,
//           reason: "Product no longer exists in the store.",
//         });
//         continue;
//       }

//       const stockQty =
//         productData.sizes[item.productSize]?.[item.productColor]?.qty || 0;

//       if (stockQty < item.quantity) {
//         unavailableItems.push({
//           title: item.title,
//           photourl: item.photourl,
//           reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
//         });
//         continue;
//       }

//       // Update the stock in Firebase
//       const newStockQty = stockQty - item.quantity;

//       if (newStockQty > 0) {
//         await fetch(
//           `${url}/Stores/${uid}/Products/${item.id}/sizes/${item.productSize}/${item.productColor}.json?auth=${idToken}`,
//           {
//             method: "PATCH",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ qty: newStockQty }),
//           }
//         );
//       } else {
//         // Delete the size/color if stock is depleted
//         await fetch(
//           `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`,
//           {
//             method: "DELETE",
//           }
//         );
//       }

//       updatedCart.push(item);
//     }

//     if (unavailableItems.length > 0) {
//       document.getElementById("preloader").classList.add("hidden");

//       const unavailableList = unavailableItems
//         .map(
//           (item) =>
//             `<li>
//               <img src="${item.photourl}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
//               <strong>${item.title}</strong> - ${item.reason}
//             </li>`
//         )
//         .join("");

//       Swal.fire({
//         icon: "warning",
//         title: "Some items are unavailable",
//         html: `<ul>${unavailableList}</ul>`,
//       }).then(() => {
//         location.reload();
//       });

//       return;
//     }

//     // Get personal information and shipping fees
//     const personalInfo = await getPersonalInfo(Customeruid, idToken);
//     const shippingFees = parseFloat(localStorage.getItem("shippingFees")) || 0;
//     const payment = localStorage.getItem("Payment") || "N/A";

//     // // await addOrderToCustomerHistory(Customeruid, idToken, order);
//     // const orderUID = await addOrderToCustomerHistory(
//     //   Customeruid,
//     //   idToken,
//     //   order
//     // );

//     // // Construct the order
//     // const order = {
//     //   cart: updatedCart,
//     //   personal_info: personalInfo,
//     //   Customeruid: Customeruid,
//     //   orderUID: orderUID,
//     //   shippingFees,
//     // };
//     // Construct a preliminary order object
//     const preliminaryOrder = {
//       cart: updatedCart,
//       personal_info: personalInfo,
//       shippingFees,
//       payment,
//     };

//     // Add order to customer history and get the order UID
//     const orderUID = await addOrderToCustomerHistory(
//       Customeruid,
//       idToken,
//       preliminaryOrder
//     );

//     // Construct the final order object
//     const order = {
//       ...preliminaryOrder, // Spread the preliminary order properties
//       Customeruid: Customeruid,
//       orderUID: orderUID, // Add the order UID
//       Date: formattedDate,
//     };

//     // Submit the order to Firebase
//     const orderResponse = await fetch(
//       `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(order),
//       }
//     );

//     if (!orderResponse.ok) {
//       throw new Error("Failed to submit order");
//     }

//     // Clear the cart
//     localStorage.removeItem("cart");
//     document.getElementById("preloader").classList.add("hidden");

//     Swal.fire({
//       icon: "success",
//       title: "Order submitted successfully!",
//       showConfirmButton: false,
//       timer: 2000,
//     }).then(() => {
//       window.location.href = "./index.html";
//     });
//   } catch (error) {
//     console.error("Error during order submission:", error);
//     document.getElementById("preloader").classList.add("hidden");
//     Swal.fire({
//       icon: "error",
//       title: "Error",
//       text: "An error occurred while processing your order. Please try again.",
//     });
//   }
// }

async function submitOrder() {
  try {
    let customerInfo = null;
    let idToken = null;
    let Customeruid = null;

    // Check if the user is authenticated
    const user = firebase.auth().currentUser;

    if (!user) {
      // User is not authenticated, show the guest form
      const guestFormResult = await Swal.fire({
        title: "Guest Checkout",
        html:
          `<input id="swal-input1" class="swal2-input" placeholder="Name" required>` +
          `<input id="swal-input2" class="swal2-input" placeholder="Phone Number" required>` +
          `<input id="swal-input3" class="swal2-input" placeholder="Address" required>` +
          `<input id="swal-input4" class="swal2-input" placeholder="Phone Number 2 (Optional)">`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Submit",
        cancelButtonText: "Cancel",
        allowOutsideClick: false,
        allowEscapeKey: false,
        preConfirm: () => {
          const name = document.getElementById("swal-input1").value;
          const phone = document.getElementById("swal-input2").value;
          const address = document.getElementById("swal-input3").value;
          const phone2 = document.getElementById("swal-input4").value;

          // Validate required fields
          if (!name || !phone || !address) {
            Swal.showValidationMessage("Please fill out all required fields.");
            return false;
          }

          // Return the guest details
          return { name, phone, address, phone2 };
        },
      });

      if (guestFormResult.isConfirmed) {
        // Save guest details
        customerInfo = guestFormResult.value;

        // Sign in the guest user programmatically
        const email = "hancockstoreguest@gmail.com";
        const password = "hancockstoreguest@gmail.com"; // Replace with the actual password

        const userCredential = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);

        // Get the ID token for the signed-in user
        idToken = await userCredential.user.getIdToken();
        Customeruid = userCredential.user.uid;
      } else {
        // User canceled the guest checkout
        return;
      }
    } else {
      // User is authenticated, fetch their token and UID
      idToken = await user.getIdToken();
      Customeruid = user.uid;
      customerInfo = await getPersonalInfo(Customeruid, idToken);
    }

    // Get the cart from local storage
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (!cart || cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Your cart is empty",
        text: "Please add items to your cart before placing an order.",
      });
      return;
    }

    const cartTotalElement = document.getElementById("cart-total");
    let cartTotal = 0;

    if (cartTotalElement) {
      const cartTotalText = cartTotalElement.innerText.match(/\d+/)
        ? cartTotalElement.innerText.match(/\d+/)[0]
        : "0";
      cartTotal = parseInt(cartTotalText, 10);
    }

    const unavailableItems = [];
    const updatedCart = [];

    for (const item of cart) {
      // Fetch the product data from Firebase
      const productResponse = await fetch(
        `${url}/Stores/${uid}/Products/${item.id}.json?auth=${idToken}`
      );
      const productData = await productResponse.json();

      if (!productData) {
        unavailableItems.push({
          title: item.title,
          photourl: item.photourl,
          reason: "Product no longer exists in the store.",
        });
        continue;
      }

      const stockQty =
        productData.sizes[item.productSize]?.[item.productColor]?.qty || 0;

      if (stockQty < item.quantity) {
        unavailableItems.push({
          title: item.title,
          photourl: item.photourl,
          reason: `Requested quantity (${item.quantity}) exceeds available stock (${stockQty}).`,
        });
        continue;
      }

      updatedCart.push(item);
    }

    if (unavailableItems.length > 0) {
      const unavailableList = unavailableItems
        .map(
          (item) =>
            `<li>
              <img src="${item.photourl}" alt="${item.title}" style="width: 50px; height: 50px; margin-right: 10px;">
              <strong>${item.title}</strong> - ${item.reason}
            </li>`
        )
        .join("");

      Swal.fire({
        icon: "warning",
        title: "Some items are unavailable",
        html: `<ul>${unavailableList}</ul>`,
      }).then(() => {
        location.reload();
      });

      return;
    }

    // Get shipping fees and payment method
    const shippingFees = parseFloat(localStorage.getItem("shippingFees")) || 0;
    const payment = localStorage.getItem("Payment") || "N/A";

    // Construct the order
    const order = {
      cart: updatedCart,
      personal_info: customerInfo, // Use guest details or authenticated user's info
      Customeruid: Customeruid,
      shippingFees,
      payment,
      Date: new Date().toISOString(), // Add the current date
    };

    // Submit the order to Firebase
    const orderResponse = await fetch(
      `${url}/Stores/${uid}/orders.json?auth=${idToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      }
    );

    if (!orderResponse.ok) {
      throw new Error("Failed to submit order");
    }

    // Clear the cart
    localStorage.removeItem("cart");

    // Show success message
    await Swal.fire({
      icon: "success",
      title: "Order submitted successfully!",
      showConfirmButton: false,
      timer: 2000,
    });

    // Log out the user
    await firebase.auth().signOut();

    // Redirect to the homepage
    window.location.href = "./index.html";
  } catch (error) {
    console.error("Error during order submission:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "An error occurred while processing your order. Please try again.",
    });
  }
}

async function getPersonalInfo(Customeruid, idToken) {
  try {
    // Fetch personal info from Firebase
    const response = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/users/${Customeruid}/personalInfo.json?auth=${idToken}`
    );
    const data = await response.json();

    if (!data) {
      throw new Error("Failed to fetch personal information.");
    }

    // Extract personal info key and details
    const personalInfoKey = Object.keys(data)[0];
    const personalInfo = data[personalInfoKey];
    const userid = Customeruid;
    const name = `${personalInfo.firstName} ${personalInfo.lastName}`;
    const { email, phone, phone2 } = personalInfo;

    // Retrieve address, city, and shipping fees from local storage
    const address = localStorage.getItem("Address") || "N/A";
    const city = localStorage.getItem("City") || "N/A";
    const shippingFees = parseFloat(localStorage.getItem("shippingFees")) || 0;

    // Combine all information into a single object
    return {
      userid,
      name,
      email,
      phone,
      phone2,
      address,
      city,
      shippingFees,
    };
  } catch (error) {
    console.error("Error fetching personal information:", error);
    throw error;
  }
}

async function addOrderToCustomerHistory(Customeruid, idToken, order) {
  try {
    // Use `push()` to generate a random unique key automatically
    const saveResponse = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/users/${Customeruid}/orderHistory/${uid}.json?auth=${idToken}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          order: order.cart.map((item) => ({
            id: item.id,
            brand: item.brand,
            title: item.title,
            photo: item.photourl,
            price: item.price,
            qty: item.quantity,
            size: item.productSize,
            color: item.productColor,
          })),
          progress: "Pending", // Add progress with a default value of "Pending"
          payment: order.payment,
          Date: formattedDate,
        }),
      }
    );

    if (!saveResponse.ok) throw new Error("Order history couldn't save");

    // Retrieve the unique key from the Firebase response
    const saveData = await saveResponse.json();
    const orderUID = saveData.name; // Firebase's generated key

    return orderUID; // Return the UID if needed elsewhere
  } catch (error) {
    console.error("Error updating order history:", error);
    throw error; // Rethrow the error to handle it in the calling function
  }
}
