document.addEventListener("DOMContentLoaded", () => {
  // Fetch and display orders data
  function checkAndDisplayEmptyMessage(tableBodyId, sectionId, message) {
    const tableBody = document.getElementById(tableBodyId);
    const section = document.getElementById(sectionId);

    // Find the parent table element
    const table = tableBody.closest("table");

    // Clear existing empty message
    const existingMessage = section.querySelector(".no-orders");
    if (existingMessage) {
      existingMessage.remove();
    }

    // If the table is empty, hide the table and show the message
    if (tableBody.children.length === 0) {
      if (table) {
        table.classList.add("hidden"); // Hide the table
      }

      const noOrdersMessage = document.createElement("div");
      noOrdersMessage.innerHTML = `<p>${message}</p>`;
      noOrdersMessage.classList.add(
        "flex",
        "align-items",
        "center",
        "available-height",
        "available-width",
        "no-orders"
      );
      section.appendChild(noOrdersMessage);
    } else {
      // If the table is not empty, ensure the table is visible
      if (table) {
        table.classList.remove("hidden");
      }
    }
  }

  async function fetchOrders() {
    const preloader = document.getElementById("preloader");
    const ordersContent = document.getElementById("orders-content");
    const totalOrdersElement = document.getElementById("Total-orders");
    const pendingOrdersElement = document.getElementById("Pending-orders");
    const CompletedOrdersElement = document.getElementById("Completed-orders");
    const canceldOrdersElement = document.getElementById("Canceld-orders");

    let totalOrdersCount = 0;
    let pendingOrdersCount = 0;
    let completedOrdersCount = 0;
    let CanceldOrdersCount = 0;

    try {
      // Show the preloader
      preloader.classList.remove("hidden");

      const response = await fetch(`${url}/Stores/${uid}/orders.json`);
      const data = await response.json();

      const ordersTableBody = document.getElementById("orders-table-body");
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      const canceledOrdersTableBody = document.getElementById(
        "Canceled-orders-table-body"
      );
      ordersTableBody.innerHTML = ""; // Clear existing content
      completedOrdersTableBody.innerHTML = ""; // Clear existing content
      canceledOrdersTableBody.innerHTML = ""; // Clear existing content

      if (!data) {
        checkAndDisplayEmptyMessage(
          "orders-table-body",
          "orders-content",
          "No pending orders yet."
        );
        checkAndDisplayEmptyMessage(
          "completed-orders-table-body",
          "completed-orders-content",
          "No completed orders yet."
        );
        checkAndDisplayEmptyMessage(
          "Canceled-orders-table-body",
          "Canceled-orders-content",
          "No canceled orders yet."
        );
        return;
      }
      // Reverse the order of orders
      const reversedOrders = Object.entries(data).reverse();
      totalOrderscount = reversedOrders.length; // Get the total number of orders
      totalOrdersElement.innerHTML = totalOrderscount; //

      for (const [orderId, order] of reversedOrders) {
        const customerName = `${order.personal_info.name}`;
        const email = order.personal_info.email;
        const city = order.personal_info.city;
        const address = order.personal_info.address;
        const phoneNumber = order.personal_info.phone;
        const housenumber = order.personal_info.phone2;
        const Customeruid = order.Customeruid;
        const cutomerorderuid = order.orderUID;

        const totalPrice =
          order.cart.reduce(
            (sum, item) =>
              sum + parseFloat(item.price.replace(" EGP", "")) * item.quantity,
            0
          ) + order.shippingFees;

        const row = document.createElement("tr");
        row.classList.add("point", "order-tr");
        row.setAttribute("data-order-id", orderId); // Adding data-order-id attribute

        // Apply color class based on progress
        if (order.progress === "accepted") {
          row.classList.add("green-tr");
          completedOrdersCount++;
        } else if (order.progress === "notaccepted") {
          row.classList.add("red-tr");
          CanceldOrdersCount++;
        } else {
          row.classList.add("yellow-tr");
          pendingOrdersCount++;
        }

        row.innerHTML = `
                        <td>${orderId}</td>
                        <td>${customerName}</td>
                        <td class="w-300">${email}</td>
                        <td>${city}</td>
                        <td>
                            <div class="flex center flex-start">
                                <div class="loc-order-ico m-LR-2" onclick="searchonmap('${address}', event)"><i class="bi bi-geo-alt"></i></div>
                                <div class="loc-order-ico m-LR-2" onclick="copytoclipbarod('${address}', event)"><i class="bi bi-copy"></i></div>
                            </div>
                        </td>

                        <td>${phoneNumber}</td>
                        <td>${housenumber}</td>
                        <td>${order.shippingFees} EGP</td>
                        <td>${totalPrice} EGP</td>
                        <td class="flex center align items w-500">
                            <button type="button" class="addbtn pointer open-order-btn p-7">
                             <p>Open Order</p><i class="bi bi-plus-circle point" data-order-id="${orderId}"></i>
                            </button>
                            <button type="button" class="addbtn pointer accept-order-btn p-7" data-order-id="${orderId}" id="Activate" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'accepted', event)">
                               <p>Accept Order</p><i class="bi bi-box-fill pointer"></i>
                            </button>
                            <button type="button" class="addbtn pointer out-for-shipping accept-order-btn p-7 hidden" data-order-id="${orderId}" id="" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'shipped', event)">
                               <p>Mark As Shipped</p> <i class="bi bi-truck"></i>
                            </button>
                            <button type="button" class="addbtn pointer returned accept-order-btn p-7 hidden" data-order-id="${orderId}" id="" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'returned', event)">
                               <p>Mark As Returned</p> <i class="bi bi-arrow-counterclockwise"></i>
                            </button>
                            <button type="button" class="addbtn pointer accept-order-btn p-7" data-order-id="${orderId}" id="print" onclick="print('${orderId}')">
                                 <p>Print Order</p><i class="bi bi-printer"></i>
                            </button>
                            <button type="button" class="addbtn pointer deaccept-order-btn p-7" data-order-id="${orderId}" id="Deactivate" onclick="updateOrderStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'notaccepted', event)">
                                <p>Cancel Order</p><i class="bi bi-x-circle pointer"></i>
                            </button>
                            
                        </td>
                    `;
        if (order.progress === "accepted") {
          completedOrdersTableBody.appendChild(row);
          removeButtonsFromCompletedOrdersTable(); // Remove buttons from completed orders table
        } else if (order.progress === "notaccepted") {
          canceledOrdersTableBody.appendChild(row);
        } else {
          ordersTableBody.appendChild(row);
        }
        removePrintButtonsFromTables();
      }

      CompletedOrdersElement.innerHTML = completedOrdersCount;
      canceldOrdersElement.innerHTML = CanceldOrdersCount;
      pendingOrdersElement.innerHTML = pendingOrdersCount;

      // Check for empty tables and display messages
      checkAndDisplayEmptyMessage(
        "orders-table-body",
        "orders-content",
        "No pending orders yet."
      );
      checkAndDisplayEmptyMessage(
        "completed-orders-table-body",
        "completed-orders-content",
        "No completed orders yet."
      );
      checkAndDisplayEmptyMessage(
        "Canceled-orders-table-body",
        "Canceled-orders-content",
        "No canceled orders yet."
      );

      // Add click event listener to all rows
      document.querySelectorAll("tr.point").forEach((row) => {
        row.addEventListener("click", toggleOrderDetails);
      });
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      // Ensure the preloader is hidden
      preloader.classList.add("hidden");
    }
  }

  const db = firebase.database(); // Get the database reference
  let previousOrdersCount = 0; // Track the number of orders

  // Notification Sound
  const notificationSound = new Audio("./assets/soundEffects/neworder.mp3"); // Replace with your sound file URL
  function listenForNewOrders() {
    const ordersRef = db.ref(`Stores/${uid}/orders`);
    ordersRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const currentOrdersCount = Object.keys(data).length; // Get the total number of orders

        // Play sound only if a new order is added
        if (currentOrdersCount > previousOrdersCount) {
          // notificationSound.play();
        }

        previousOrdersCount = currentOrdersCount; // Update the previous count
        fetchOrders(); // Update UI
      }
    });
    fetchOrders();
  }

  listenForNewOrders();

  // Dark & Light toggle
  document.querySelector(".day-night input").addEventListener("change", () => {
    document.querySelector("body").classList.toggle("dark");
  });

  function removeButtonsFromCompletedOrdersTable() {
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    completedOrdersTableBody
      .querySelectorAll("button#Activate, button#Deactivate")
      .forEach((button) => {
        button.remove();
      });
  }

  function removePrintButtonsFromTables() {
    // Remove from Pending Orders Section
    const pendingOrdersSection = document.getElementById(
      "pending-orders-section"
    );
    pendingOrdersSection.querySelectorAll("button#print").forEach((button) => {
      button.remove();
    });

    // Remove from Canceled Orders Table Body
    const canceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );
    canceledOrdersTableBody
      .querySelectorAll("button#print")
      .forEach((button) => {
        button.remove();
      });
  }

  async function updateOrderStatus(
    orderId,
    Customeruid,
    cutomerorderuid,
    status,
    event
  ) {
    event.stopPropagation(); // Prevent row click event

    const customerUid = Customeruid;
    const customerOrderUid = cutomerorderuid;

    const row = document.querySelector(`tr[data-order-id="${orderId}"]`);
    if (!row) {
      console.error("Row not found");
      return;
    }

    // Get the current authenticated user
    const user = firebase.auth().currentUser;
    if (!user) {
      Swal.fire({
        title: "Authentication Required!",
        text: "You need to be signed in to update the order status.",
        icon: "warning",
        toast: true,
        position: "top-end", // Positions toast in the top-right corner
        showConfirmButton: false,
        timer: 3000, // Closes after 3 seconds
        timerProgressBar: true, // Adds a progress bar
      });
      return; // Exit if the user is not authenticated
    }

    try {
      // Get the ID token of the authenticated user
      const idToken = await user.getIdToken();
      const shippingFees = parseFloat(
        row
          .querySelector("td:nth-last-child(3)") // Third-to-last <td> for shipping fees
          .textContent.replace(" EGP", "")
      );

      const totalPriceWithShipping = parseFloat(
        row
          .querySelector("td:nth-last-child(2)") // Second-to-last <td> for total price
          .textContent.replace(" EGP", "")
      );

      const totalPrice = totalPriceWithShipping - shippingFees;
      //

      if (status === "accepted") {
        // Update the status in the database with ID token
        const response = await fetch(
          `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${idToken}`,
            },
            body: JSON.stringify({ progress: "accepted" }),
          }
        );

        await updateCustomerOrder(
          customerUid,
          customerOrderUid,
          status,
          idToken
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Fetch the current Matager data with ID token
        const matagerResponse = await fetch(
          `${url}/Stores/${uid}/Matager.json?auth=${idToken}`
        );
        if (!matagerResponse.ok) {
          throw new Error("Failed to fetch Matager data");
        }
        const matagerData = await matagerResponse.json();

        // Calculate the new values
        const newAmount = matagerData.Amount + totalPrice;
        const newCount = matagerData.count + 1;
        const newMatagerCut =
          matagerData["matager-cut"] + totalPrice * matager_percentage;

        // Update the Matager object with ID token
        const updateMatagerResponse = await fetch(
          `${url}/Stores/${uid}/Matager.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              Amount: newAmount,
              count: newCount,
              "matager-cut": newMatagerCut,
            }),
          }
        );

        if (!updateMatagerResponse.ok) {
          throw new Error("Failed to update Matager data");
        }

        // Move the row to the completed orders table and remove unwanted buttons
        const completedOrdersTableBody = document.getElementById(
          "completed-orders-table-body"
        );
        const acceptedRow = row.cloneNode(true);
        acceptedRow.querySelector(".accept-order-btn")?.remove();
        acceptedRow.querySelector(".delete-order-btn")?.remove();
        completedOrdersTableBody.appendChild(acceptedRow);
        row.remove(); // Remove from the current table

        Swal.fire({
          title: "Accepted!",
          text: "Order has been accepted.",
          icon: "success",
          toast: true,
          position: "top-end", // Positions toast in the top-right corner
          showConfirmButton: false,
          timer: 3000, // Closes after 3 seconds
          timerProgressBar: true, // Adds a progress bar
        }).then(() => {
          location.reload(); // Reloads page after toast disappears
        });
      } 
      else if (status === "deleted") {
        // Show confirmation alert with password input before deleting the order
        Swal.fire({
          title: "Are you sure?",
          text: `Do you really want to delete the order?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, delete it!",
          cancelButtonText: "No, keep it",
          input: "password",
          inputPlaceholder: "Enter your password",
          inputAttributes: {
            autocapitalize: "off",
            autocorrect: "off",
          },
          preConfirm: (password) => {
            if (!password) {
              Swal.showValidationMessage("Password is required");
            }
            return password;
          },
        })
          .then(async (result) => {
            if (result.isConfirmed) {
              const password = result.value;

              // Check if the entered password matches the fixed password
              if (password === "bussmo077") {
                try {
                  const response = await fetch(
                    `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
                    {
                      method: "DELETE",
                    }
                  );

                  if (!response.ok) {
                    throw new Error("Failed to delete order");
                  }

                  // Remove the row from the table
                  row.remove();
                  Swal.fire({
                    title: "Deleted!",
                    text: `Order has been deleted.`,
                    icon: "success",
                  }).then(() => {
                    location.reload();
                  });
                } catch (error) {
                  Swal.fire({
                    title: "Error!",
                    text: error.message,
                    icon: "error",
                  });
                }
              } else {
                Swal.fire({
                  title: "Error!",
                  text: "Incorrect password.",
                  icon: "error",
                });
              }
            }
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: `An unexpected error occurred: ${error.message}`,
              icon: "error",
            });
          });
      } else {
        // Update the status and show only pending or deleted rows with ID token
        const response = await fetch(
          `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ progress: status }),
          }
        );
        await updateCustomerOrder(
          customerUid,
          customerOrderUid,
          status,
          idToken
        );

        if (!response.ok) {
          throw new Error("Failed to update order status");
        }

        // Update the row class based on the new status
        row.classList.remove("red-tr", "green-tr", "yellow-tr");
        if (status === "accepted") {
          row.classList.add("green-tr");
          moveRow(row, "completed");
        } else if (status === "pending") {
          row.classList.add("yellow-tr");
          moveRow(row, "orders");
        } else if (status === "notaccepted") {
          row.classList.add("red-tr");
          moveRow(row, "canceled");
        }

        Swal.fire({
          title: "Success",
          text: `Order status updated to ${status}`,
          icon: "success",
          toast: true,
          position: "top-end", // Top-right corner
          showConfirmButton: false,
          timer: 3000, // Closes after 3 seconds
          timerProgressBar: true, // Shows a progress bar
        }).then(() => {
          location.reload(); // Reloads the page after the toast disappears
        });
      }
      // Update table visibility
      updateTableVisibility();
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: `Failed to update order status: ${error.message}`,
        icon: "error",
        toast: true,
        position: "top-end", // Top-right corner
        showConfirmButton: false,
        timer: 4000, // Closes after 4 seconds
        timerProgressBar: true, // Shows a progress bar
      });
    }
  }

  function moveRow(row, tableId) {
    const ordersTableBody = document.getElementById("orders-table-body");
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    const CanceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );

    if (tableId === "completed") {
      if (row.parentNode !== completedOrdersTableBody) {
        row.remove();
        completedOrdersTableBody.appendChild(row);
      }
    } else if (tableId === "orders") {
      if (row.parentNode !== ordersTableBody) {
        row.remove();
        ordersTableBody.appendChild(row);
      }
    } else if (tableId === "notaccepted") {
      if (row.parentNode !== CanceledOrdersTableBody) {
        row.remove();
        ordersTableBody.appendChild(row);
      }
    }
  }

  // Function to update table visibility
  function updateTableVisibility() {
    const ordersTableBody = document.getElementById("orders-table-body");
    const completedOrdersTableBody = document.getElementById(
      "completed-orders-table-body"
    );
    const canceledOrdersTableBody = document.getElementById(
      "Canceled-orders-table-body"
    );

    // Show only pending or deleted orders in the orders table
    ordersTableBody.querySelectorAll("tr").forEach((row) => {
      if (
        row.classList.contains("red-tr") ||
        row.classList.contains("yellow-tr")
      ) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Show only accepted orders in the completed orders table
    completedOrdersTableBody.querySelectorAll("tr").forEach((row) => {
      if (row.classList.contains("green-tr")) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });

    // Show only canceled orders in the canceled orders table
    canceledOrdersTableBody.querySelectorAll("tr").forEach((row) => {
      if (row.classList.contains("red-tr")) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }

  // Make the function globally accessible
  window.updateOrderStatus = updateOrderStatus;
});

function toggleDropdown() {
  const dropdown = document.getElementById("dropdown");
  dropdown.classList.toggle("active");
}

// Close dropdown if clicked outside
document.addEventListener("click", function (event) {
  const profileIcon = document.querySelector(".profile-icon");
  const dropdown = document.getElementById("dropdown");
  if (!profileIcon.contains(event.target)) {
    dropdown.classList.remove("active");
  }
});

// async function toggleOrderDetails(event) {
//   const row = event.currentTarget;
//   const nextRow = row.nextElementSibling;

//   // Check if the next row is already the details row
//   // if (nextRow && nextRow.classList.contains("order-details")) {
//   //   // Collapse to hide cart items
//   //   nextRow.remove();
//   // }
//   if (nextRow && nextRow.classList.contains("order-details")) {
//     // Set initial height for smooth transition
//     nextRow.style.height = `${nextRow.scrollHeight}px`; // Set to current height
//     nextRow.style.opacity = "1";
//     nextRow.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out";

//     // Trigger the collapse transition
//     setTimeout(() => {
//       nextRow.style.height = "0";
//       nextRow.style.opacity = "0";
//     }, 15);

//     // Remove the row after the transition completes
//     nextRow.addEventListener(
//       "transitionend",
//       (event) => {
//         if (event.propertyName === "height" && nextRow.style.height === "0px") {
//           nextRow.remove();
//         }
//       },
//       { once: true }
//     );
//     row.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//       inline: "start",
//     });
//   } else {
//     disableInteractions(event);
//     // Add wave loading effect
//     row.classList.add("wave-loading");

//     const MIN_LOADING_TIME = 1000; // Minimum wave effect duration in milliseconds
//     const startTime = Date.now();

//     try {
//       const orderId = row.getAttribute("data-order-id");
//       const response = await fetch(
//         `${url}/Stores/${uid}/orders/${orderId}.json`
//       );
//       const order = await response.json();

//       if (!order || !order.cart) {
//         console.error("Order or cart is null or undefined.");
//         return;
//       }

//       const cartItems = order.cart
//         .map(
//           (item) => `
//             <tr class="cart-item">
//               <td colspan="11">
//                 <div style="display: flex; align-items: center; width: max-content;">
//                   <img src="${item.photourl}" alt="${item.title}"
//                        style="width: auto; height: 80px; margin-right: 10px;"
//                        class="clickable-image pointer">
//                   <div style="display: flex; flex-direction: column; gap: 5px;">
//                     <p>${item.id}</p>
//                     <p>${item.brand}</p>
//                     <p>${item.productColor}</p>
//                     <p>${item.productSize}</p>
//                     <p>Qty: ${item.quantity}</p>
//                     <p>${
//                       parseFloat(item.price.replace(" EGP", "")) * item.quantity
//                     } EGP</p>
//                   </div>
//                 </div>
//               </td>
//             </tr>`
//         )
//         .join("");

//       const elapsedTime = Date.now() - startTime;
//       const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

//       // Wait for the remaining time before adding the details row
//       await new Promise((resolve) => setTimeout(resolve, remainingTime));

//       const detailsRow = document.createElement("tr");
//       detailsRow.classList.add("order-details");
//       detailsRow.innerHTML = `
//         <td colspan="11">
//           <table style="width: 100%;">
//             <tbody class="flex flex-wrap">
//               ${cartItems}
//             </tbody>
//           </table>
//         </td>
//       `;

//       // Set initial state for animation
//       detailsRow.style.maxHeight = "0";
//       detailsRow.style.opacity = "0";
//       detailsRow.style.overflow = "hidden";
//       detailsRow.style.transition =
//         "height 0.6s ease-out, opacity 0.6s ease-out";

//       row.after(detailsRow);

//       // Trigger the transition after appending
//       setTimeout(() => {
//         detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`;
//         detailsRow.style.opacity = "1";
//       }, 15);
//       // Scroll to the first row both horizontally and vertically
//       row.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//         inline: "start",
//       });

//       // Attach click event to images
//       document.querySelectorAll(".clickable-image").forEach((img) => {
//         img.addEventListener("click", openModal);
//       });
//     } catch (error) {
//       console.error("Error fetching order details:", error);
//     } finally {
//       enableInteractions();
//       // Remove the wave-loading effect after 2 seconds
//       row.classList.remove("wave-loading");
//     }
//   }
// }

async function toggleOrderDetails(event) {
  const row = event.currentTarget;
  const nextRow = row.nextElementSibling;

  // Check if the next row is already the details row
  if (nextRow && nextRow.classList.contains("order-details")) {
    // Collapse to hide cart items (instant removal, no transition)
    nextRow.remove();
  } else {
    disableInteractions(event);
    // Add wave loading effect
    row.classList.add("wave-loading");

    const MIN_LOADING_TIME = 1000; // Minimum wave effect duration in milliseconds
    const startTime = Date.now();

    try {
      const orderId = row.getAttribute("data-order-id");
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json`
      );
      const order = await response.json();

      if (!order || !order.cart) {
        console.error("Order or cart is null or undefined.");
        return;
      }

      const cartItems = order.cart
        .map(
          (item) => `  
            <tr class="cart-item">
              <td colspan="11">
                <div style="display: flex; align-items: center; width: max-content;">
                  <img src="${item.photourl}" alt="${item.title}" 
                       style="width: auto; height: 80px; margin-right: 10px;" 
                       class="clickable-image pointer">
                  <div style="display: flex; flex-direction: column; gap: 5px;">
                    <p>${item.id}</p>
                    <p>${item.brand}</p>
                    <p>${item.productColor}</p>
                    <p>${item.productSize}</p>
                    <p>Qty: ${item.quantity}</p>
                    <p>${
                      parseFloat(item.price.replace(" EGP", "")) * item.quantity
                    } EGP</p>
                  </div>
                </div>
              </td>
            </tr>`
        )
        .join("");

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      // Wait for the remaining time before adding the details row
      await new Promise((resolve) => setTimeout(resolve, remainingTime));

      const detailsRow = document.createElement("tr");
      detailsRow.classList.add("order-details");
      detailsRow.innerHTML = `
        <td colspan="11">
          <table style="width: 100%;">
            <tbody class="flex flex-wrap">
              ${cartItems}
            </tbody>
          </table>
        </td>
      `;

      // Append the details row and animate its opening
      row.after(detailsRow);
      expandDetailsRow(detailsRow);

      // Scroll to the first row both horizontally and vertically
      row.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });

      // Attach click event to images
      document.querySelectorAll(".clickable-image").forEach((img) => {
        img.addEventListener("click", openModal);
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      enableInteractions();
      // Remove the wave-loading effect
      row.classList.remove("wave-loading");
    }
  }
}

// Helper function to expand the details row with animation
function expandDetailsRow(detailsRow) {
  detailsRow.style.maxHeight = "0"; // Start with 0 height
  detailsRow.style.opacity = "0"; // Start with 0 opacity
  detailsRow.style.overflow = "hidden"; // Prevent content from overflowing during transition
  detailsRow.style.transition =
    "max-height 0.6s ease-out, opacity 0.6s ease-out"; // Smooth transition

  // Trigger the expansion transition
  setTimeout(() => {
    detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`; // Expand to full height
    detailsRow.style.opacity = "1"; // Fade in
  }, 15);
}

// Helper function to collapse the details row (no transition)
function collapseDetailsRow(detailsRow) {
  detailsRow.remove(); // Remove the row instantly
}

// Helper function to expand the details row with animation
function expandDetailsRow(detailsRow) {
  detailsRow.style.maxHeight = "0";
  detailsRow.style.opacity = "0";
  detailsRow.style.overflow = "hidden";
  detailsRow.style.transition =
    "max-height 0.6s ease-out, opacity 0.6s ease-out";

  // Trigger the expansion transition
  setTimeout(() => {
    detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`;
    detailsRow.style.opacity = "1";
  }, 15);
}

// Helper function to collapse the details row with animation
function collapseDetailsRow(detailsRow) {
  detailsRow.style.height = `${detailsRow.scrollHeight}px`; // Set to current height
  detailsRow.style.opacity = "1";
  detailsRow.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out";

  // Trigger the collapse transition
  setTimeout(() => {
    detailsRow.style.height = "0";
    detailsRow.style.opacity = "0";
  }, 15);

  // Remove the row after the transition completes
  detailsRow.addEventListener(
    "transitionend",
    (event) => {
      if (
        event.propertyName === "height" &&
        detailsRow.style.height === "0px"
      ) {
        detailsRow.remove();
      }
    },
    { once: true }
  );
}

// Helper function to expand the details row with animation
function expandDetailsRow(detailsRow) {
  detailsRow.style.maxHeight = "0";
  detailsRow.style.opacity = "0";
  detailsRow.style.overflow = "hidden";
  detailsRow.style.transition =
    "max-height 0.6s ease-out, opacity 0.6s ease-out";

  // Trigger the expansion transition
  setTimeout(() => {
    detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`;
    detailsRow.style.opacity = "1";
  }, 15);
}

const modal = document.getElementById("imageModal");
const modalImg = document.getElementById("modalImage");
const captionText = document.getElementById("caption");
const span = document.getElementsByClassName("close")[0];

function openModal(event) {
  event.stopPropagation(); // Prevent triggering row click event
  modal.classList.add("show", "flex", "column");
  modalImg.style.background = "none"; // Removes background
  modalImg.src = event.target.src;
  captionText.innerHTML = event.target.alt;
}

span.onclick = function () {
  closeModal();
};

window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
};

function closeModal() {
  modal.classList.add("zoom-out"); // Add zoom-out animation
  setTimeout(() => {
    modal.classList.remove("show", "zoom-out"); // Remove after animation
  }, 600); // Match animation-duration (0.6s)
}

function searchonmap(address, event) {
  event.stopPropagation(); // Prevents the row click event from being triggered
  // Create a URL for the Google Maps search
  var url = "https://maps.google.com/maps?q=" + encodeURIComponent(address);
  // Open the URL in a new tab
  window.open(url, "_blank");
}

function copytoclipbarod(address, event) {
  event.stopPropagation(); // Prevents the row click event from being triggered

  // Create a textarea element to hold the address
  var textarea = document.createElement("textarea");
  textarea.value = address;

  // Add the textarea to the page
  document.body.appendChild(textarea);

  // Select the textarea
  textarea.select();

  // Copy the address to the clipboard
  document.execCommand("copy");

  // Remove the textarea from the page
  document.body.removeChild(textarea);

  // Determine which element was clicked
  var clickedElement = event.currentTarget;

  // Get the icon within the clicked element
  var icon = clickedElement.querySelector("i");

  // Change the icon to a checkmark
  if (icon) {
    icon.classList.remove("bi-copy"); // Remove the existing icon class
    icon.classList.add("bi-check-circle"); // Add the checkmark icon class

    // Revert back to the original icon after 1 second
    setTimeout(function () {
      icon.classList.remove("bi-check-circle");
      icon.classList.add("bi-copy");
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const upgradeButton = document.getElementById("report-btn");
  upgradeButton.addEventListener("click", () => {
    window.location.href = "./report.html";
  });
});

async function updateCustomerOrder(
  customerUid,
  customerOrderUid,
  status,
  idToken
) {
  const orderHistoryUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${customerUid}/orderHistory/${uid}/${customerOrderUid}.json?auth=${idToken}`;
  try {
    const response = await fetch(orderHistoryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ progress: status }),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer's order history");
    }

    console.log("Customer order history updated successfully.");
  } catch (error) {
    console.error("Error updating customer's order history:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

function showpendingOrders() {
  document.getElementById("pending-orders-section").classList.remove("hidden");
  document.getElementById("completed-orders-section").classList.add("hidden");
  document.getElementById("Canceled-orders-section").classList.add("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor =
    "#6a64f142";
  document.getElementById("show-completed-btn").style.backgroundColor = "";
  document.getElementById("show-canceled-btn").style.backgroundColor = "";
}
function showCompletedOrders() {
  const completedOrdersSection = document.getElementById(
    "completed-orders-section"
  );
  const completedOrdersTableBody = document.getElementById(
    "completed-orders-table-body"
  );
  const pendingOrdersSection = document.getElementById(
    "pending-orders-section"
  );
  const canceledOrdersSection = document.getElementById(
    "Canceled-orders-section"
  );

  // Toggle visibility
  pendingOrdersSection.classList.add("hidden");
  completedOrdersSection.classList.remove("hidden");
  canceledOrdersSection.classList.add("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor = "";
  document.getElementById("show-completed-btn").style.backgroundColor =
    "#6a64f142";
  document.getElementById("show-canceled-btn").style.backgroundColor = "";

  // Check if the completed orders table is empty
}
function showCanceledOrders() {
  const canceledOrdersSection = document.getElementById(
    "Canceled-orders-section"
  );
  const canceledOrdersTableBody = document.getElementById(
    "Canceled-orders-table-body"
  );
  const pendingOrdersSection = document.getElementById(
    "pending-orders-section"
  );
  const completedOrdersSection = document.getElementById(
    "completed-orders-section"
  );

  // Toggle visibility
  pendingOrdersSection.classList.add("hidden");
  completedOrdersSection.classList.add("hidden");
  canceledOrdersSection.classList.remove("hidden");

  // Update button styles
  document.getElementById("show-pending-btn").style.backgroundColor = "";
  document.getElementById("show-completed-btn").style.backgroundColor = "";
  document.getElementById("show-canceled-btn").style.backgroundColor =
    "#6a64f142";

  // Check if the canceled orders table is empty
}
$(document).ready(function () {
  // Search functionality for all three sections
  $("#sub-btn-del").click(function () {
    const searchType = $("#category").val(); // Get selected search type
    const searchValue = $("#product-id-input-del").val().toLowerCase(); // Get the search input value

    if (searchValue === "") {
      // Show SweetAlert with no confirm button
      Swal.fire({
        title: "Please enter a search term.",
        icon: "warning",
        toast: true,
        position: "top-end", // Positions toast in the top right corner
        showConfirmButton: false,
        timer: 1500, // Automatically closes after 1.5 seconds
        timerProgressBar: true, // Shows a progress bar
      });

      return;
    }

    let found = false;

    // Hide all rows initially
    $(
      "#orders-table-body tr, #completed-orders-table-body tr, #Canceled-orders-table-body tr"
    ).hide();
    $(
      "#pending-orders-section, #completed-orders-section, #Canceled-orders-section"
    ).addClass("hidden");

    // Determine where to search based on the selected type
    let columnIndex;
    switch (searchType) {
      case "OrderID": // Order-ID
        columnIndex = 0;
        break;
      case "Email": // Email
        columnIndex = 2;
        break;
      case "Phone": // Phone-num
        columnIndex = 5;
        break;
      default:
        return;
    }

    // Search through each row in the tables
    $(
      "#orders-table-body tr, #completed-orders-table-body tr, #Canceled-orders-table-body tr"
    ).each(function () {
      const row = $(this);
      const cellValue = row.find("td").eq(columnIndex).text().toLowerCase();

      if (cellValue.includes(searchValue)) {
        row.show(); // Show only the rows that match
        found = true;

        // Show the section where the result is found
        if (row.closest("tbody").is("#orders-table-body")) {
          $("#pending-orders-section").removeClass("hidden");
          // Apply background color to the "Pending" button
          $("#show-pending-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#completed-orders-table-body")) {
          $("#completed-orders-section").removeClass("hidden");
          // Apply background color to the "Completed" button
          $("#show-completed-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#Canceled-orders-table-body")) {
          $("#Canceled-orders-section").removeClass("hidden");
          // Apply background color to the "Canceled" button
          $("#show-canceled-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        }
      }
    });

    if (!found) {
      // Show SweetAlert with no confirm button
      Swal.fire({
        title: "No matching orders found.",
        icon: "info",
        toast: true,
        position: "top-end", // Positions toast in the top right corner
        showConfirmButton: false,
        timer: 1500, // Automatically closes after 1.5 seconds
        timerProgressBar: true, // Shows a progress bar
      });
    }
  });

  // Reset search functionality when input changes
  $("#product-id-input-del").on("input", function () {
    const searchValue = $(this).val();

    if (searchValue === "") {
      // Reset to show all orders (pending, completed, canceled)
      $("#orders-table-body tr").show();
      $("#completed-orders-table-body tr").show();
      $("#Canceled-orders-table-body tr").show();

      // Show all sections
      $("#pending-orders-section").addClass("hidden");
      $("#completed-orders-section").addClass("hidden");
      $("#Canceled-orders-section").addClass("hidden");

      $("#pending-orders-section").removeClass("hidden");

      // Reset button background colors
      $("#show-completed-btn,#show-pending-btn,#show-canceled-btn").css(
        "background-color",
        ""
      );

      // Clear the search input
      $("#product-id-input-del").val("");
    }
  });
});
