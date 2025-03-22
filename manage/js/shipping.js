document.addEventListener("DOMContentLoaded", () => {
  fetchOrdersByStatus();
});
async function fetchOrdersByStatus() {
  const preloader = document.getElementById("preloader");

  // Define table content containers
  const completedOrdersTableBody = document.getElementById(
    "completed-orders-table-body"
  );
  const shippedOrdersTableBody = document.getElementById(
    "shipped-orders-table-body"
  );
  const deliveredOrdersTableBody = document.getElementById(
    "delivered-orders-table-body"
  );
  const returnedOrdersTableBody = document.getElementById(
    "returned-orders-table-body"
  );

  // Define counters for each status
  let completedCount = 0;
  let shippedCount = 0;
  let deliveredCount = 0;
  let returnedCount = 0;

  try {
    // Show the preloader
    preloader.classList.remove("hidden");

    // Fetch the data
    const response = await fetch(`${url}/Stores/${uid}/orders.json`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    // Clear existing content
    completedOrdersTableBody.innerHTML = "";
    shippedOrdersTableBody.innerHTML = "";
    deliveredOrdersTableBody.innerHTML = "";
    returnedOrdersTableBody.innerHTML = "";

    // if (!data) {
    //   console.log("No orders found.");
    //   [
    //     "completed-orders-content",
    //     "shipped-orders-content",
    //     "delivered-orders-content",
    //     "returned-orders-content",
    //   ].forEach((contentId) => {
    //     checkAndDisplayEmptyMessage(
    //       `${contentId}-table-body`,
    //       contentId,
    //       `No ${contentId
    //         .replace("-content", "")
    //         .replace("-", " ")} orders yet.`
    //     );
    //   });
    //   return;
    // }

    if (!data) {
      console.log("No orders found.");

      [
        "completed-orders-content",
        "shipped-orders-content",
        "delivered-orders-content",
        "returned-orders-content",
      ].forEach((contentId) => {
        const tableBody = document.getElementById(`${contentId}-table-body`);
        const contentDiv = document.getElementById(contentId);

        if (!tableBody || tableBody.children.length === 0) {
          // Remove existing empty message if present
          const existingMessage = contentDiv.querySelector(".empty-message");
          if (existingMessage) existingMessage.remove();

          // Create new empty message
          const emptyMessage = document.createElement("div");
          emptyMessage.className = "empty-message";
          emptyMessage.textContent = `No ${contentId
            .replace("-content", "")
            .replace("-", " ")} orders yet.`;

          contentDiv.appendChild(emptyMessage);
        }
      });

      return;
    }

    // Reverse orders for display
    const reversedOrders = Object.entries(data).reverse();

    for (const [orderId, order] of reversedOrders) {
      const customerName = order.personal_info?.name || "N/A";
      const email = order.personal_info?.email || "N/A";
      const city = order.personal_info?.city || "N/A";
      const address = order.personal_info?.address || "N/A";
      const phoneNumber = order.personal_info?.phone || "N/A";
      const houseNumber = order.personal_info?.phone2 || "N/A";
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
      row.setAttribute("data-order-id", orderId);

      // Determine button states and labels
      const isCompleted =
        order.progress === "accepted" && !order.shippingstatus;

      const returnedButtonHTML =
        order.shippingstatus === "Returned"
          ? `<button type="button" class="addbtn pointer accept-order-btn out-for-shipping p-7" data-order-id="${orderId}" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'shipped', event)">
         <p>Mark As Shipped</p> <i class="bi bi-truck"></i>
       </button>`
          : "";

      const deliveredButtonHTML =
        order.shippingstatus === "Delivered"
          ? `<button type="button" class="addbtn pointer delivered accept-order-btn p-7 delivered-disabled" disabled>
         <p>Delivered</p> <i class="bi bi-check"></i>
       </button>
       <button type="button" class="addbtn pointer accept-order-btn out-for-shipping p-7" data-order-id="${orderId}" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'returned', event)">
         <p>Mark As Returned</p> <i class="bi bi-arrow-counterclockwise"></i>
       </button>`
          : isCompleted
          ? ""
          : `<button type="button" class="addbtn pointer delivered accept-order-btn p-7" data-order-id="${orderId}" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'delivered', event)">
         <p>Mark As Delivered</p> <i class="bi bi-box-seam"></i>
       </button>`;

      const shippedButtonHTML =
        order.shippingstatus === "Delivered" ||
        order.shippingstatus === "Shipped"
          ? `<button type="button" class="addbtn pointer accept-order-btn out-for-shipping p-7 shipped-disabled" disabled>
         <p>${order.shippingstatus === "Delivered" ? "Shipped" : "Shipped"}</p>
         <i class="bi bi-check"></i>
       </button>`
          : `<button type="button" class="addbtn pointer accept-order-btn out-for-shipping p-7" data-order-id="${orderId}" onclick="updateShippingStatus('${orderId}','${Customeruid}','${cutomerorderuid}', 'shipped', event)">
         <p>Mark As Shipped</p> <i class="bi bi-truck"></i>
       </button>`;

      row.innerHTML = `
        <td>${orderId}</td>
        <td>${customerName}</td>
        <td class="w-300">${email}</td>
        <td>${city}</td>
        <td>
            <div class="flex center flex-start">
                <div class="loc-order-ico m-LR-2" onclick="searchonmap('${address}', event)">
                    <i class="bi bi-geo-alt"></i>
                </div>
                <div class="loc-order-ico m-LR-2" onclick="copytoclipbarod('${address}', event)">
                    <i class="bi bi-copy"></i>
                </div>
            </div>
        </td>
        <td>${phoneNumber}</td>
        <td>${houseNumber}</td>
        <td>${order.shippingFees} EGP</td>
        <td>${totalPrice.toFixed(2)} EGP</td>
        <td class="flex center align items w-800">
          ${
            order.shippingstatus === "Returned"
              ? returnedButtonHTML
              : shippedButtonHTML
          }
          ${deliveredButtonHTML}
          <button type="button" class="addbtn accept-order-btn pointer p-7" onclick="print('${orderId}')">
            <p>Print Order</p><i class="bi bi-printer"></i>
          </button>
        </td>
      `;

      // Append the row to the appropriate table based on the status
      if (isCompleted) {
        completedCount++;
        row.classList.add("green-tr");
        completedOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "Shipped") {
        shippedCount++;
        row.classList.add("blue-tr");
        shippedOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "Delivered") {
        deliveredCount++;
        row.classList.add("light-move-tr");
        deliveredOrdersTableBody.appendChild(row);
      } else if (order.shippingstatus === "Returned") {
        returnedCount++;
        row.classList.add("orange-tr");
        returnedOrdersTableBody.appendChild(row);
      }
    }

    // Add click event listeners to all rows
    document.querySelectorAll("tr.point").forEach((row) => {
      row.addEventListener("click", toggleOrderDetails);
    });

    // Handle empty messages for each section
    // ["completed", "shipped", "delivered", "returned"].forEach((status) => {
    //   const body = document.getElementById(`${status}-orders-table-body`);
    //   const content = document.getElementById(`${status}-orders-content`);
    //   if (!body.children.length) {
    //     checkAndDisplayEmptyMessage(
    //       `${status}-orders-table-body`,
    //       `${status}-orders-content`,
    //       `No ${status} orders yet.`
    //     );
    //   }
    // });
    document.getElementById("completed-count").innerText = completedCount;
    document.getElementById("shipped-count").innerText = shippedCount;
    document.getElementById("delivered-count").innerText = deliveredCount;
    document.getElementById("returned-count").innerText = returnedCount;
  } catch (error) {
    console.error("Error fetching orders:", error);
  } finally {
    // Hide the preloader
    preloader.classList.add("hidden");
  }
}

async function toggleOrderDetails(event) {
  const row = event.currentTarget;
  const nextRow = row.nextElementSibling;

  // Check if the next row is already the details row
  if (nextRow && nextRow.classList.contains("order-details")) {
    // Set initial height for smooth transition
    nextRow.style.height = `${nextRow.scrollHeight}px`; // Set to current height
    nextRow.style.opacity = "1";
    nextRow.style.transition = "height 0.6s ease-out, opacity 0.6s ease-out";

    // Trigger the collapse transition
    setTimeout(() => {
      nextRow.style.height = "0";
      nextRow.style.opacity = "0";
    }, 15);

    // Remove the row after the transition completes
    nextRow.addEventListener(
      "transitionend",
      (event) => {
        if (event.propertyName === "height" && nextRow.style.height === "0px") {
          nextRow.remove();
        }
      },
      { once: true }
    );
    row.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "start",
    });
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

      // Set initial state for animation
      detailsRow.style.maxHeight = "0";
      detailsRow.style.opacity = "0";
      detailsRow.style.overflow = "hidden";
      detailsRow.style.transition =
        "height 0.6s ease-out, opacity 0.6s ease-out";

      row.after(detailsRow);

      setTimeout(() => {
        detailsRow.style.maxHeight = `${detailsRow.scrollHeight}px`;
        detailsRow.style.opacity = "1";
      }, 15);
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
      // Remove the wave-loading effect after 2 seconds
      row.classList.remove("wave-loading");
    }
  }
}

// Modal handling functions
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

async function updateShippingStatus(
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
      toast: true,
      position: "top-end",
      icon: "warning",
      title: "Authentication Required!",
      text: "You need to be signed in to update the order status.",
      showConfirmButton: false,
      timer: 3000, // Auto-closes after 3 seconds
    });
    return; // Exit if the user is not authenticated
  }

  try {
    // Get the ID token of the authenticated user
    const idToken = await user.getIdToken();
    if (status === "shipped") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "Shipped",
          }),
        }
      );
      const shippedStatus = "Shipped";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Move the row to the completed orders table and remove unwanted buttons
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      disableInteractions(event);
      const acceptedRow = row.cloneNode(true);
      acceptedRow.querySelector(".accept-order-btn")?.remove();
      acceptedRow.querySelector(".delete-order-btn")?.remove();
      completedOrdersTableBody.appendChild(acceptedRow);
      row.remove(); // Remove from the current table

      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "success",
        title: "Shipped!",
        text: "Order has been marked as shipped.",
        showConfirmButton: false,
        timer: 3000, // Auto-closes after 3 seconds
      }).then(() => {
        // location.reload();
        enableInteractions();
      });
    } else if (status === "delivered") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "Delivered",
          }),
        }
      );
      const shippedStatus = "Delivered";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      // Move the row to the completed orders table and remove unwanted buttons
      const completedOrdersTableBody = document.getElementById(
        "completed-orders-table-body"
      );
      disableInteractions(event);
      const acceptedRow = row.cloneNode(true);
      acceptedRow.querySelector(".accept-order-btn")?.remove();
      acceptedRow.querySelector(".delete-order-btn")?.remove();
      completedOrdersTableBody.appendChild(acceptedRow);
      row.remove(); // Remove from the current table

      Swal.fire({
        title: "Delivered",
        text: "Order has been marked as Delivered.",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        // location.reload();
        enableInteractions();
      });
    } else if (status === "returned") {
      // Update the status in the store's order database with ID token
      const response = await fetch(
        `${url}/Stores/${uid}/orders/${orderId}.json?auth=${idToken}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            shippingstatus: "Returned",
          }),
        }
      );
      const shippedStatus = "Returned";
      // Update the customer's order history as well
      await updateCustomerOrder(
        customerUid,
        customerOrderUid,
        idToken,
        shippedStatus
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
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
        title: "Returned",
        text: "Order has been marked as Returned.",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      }).then(() => {
        // location.reload();
      });
    }

    // updateTableVisibility();
  } catch (error) {
    console.error("Error:", error);
    Swal.fire({
      title: "Error",
      text: `Failed to update order status: ${error.message}`,
      icon: "error",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  }
}

async function updateCustomerOrder(
  customerUid,
  customerOrderUid,
  idToken,
  shippedStatus
) {
  const orderHistoryUrl = `https://matager-f1f00-default-rtdb.firebaseio.com/users/${customerUid}/orderHistory/${uid}/${customerOrderUid}.json?auth=${idToken}`;

  try {
    const response = await fetch(orderHistoryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shippingstatus: shippedStatus }),
    });

    if (!response.ok) {
      throw new Error("Failed to update customer's order history");
    }
  } catch (error) {
    console.error("Error updating customer's order history:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

//
function showOrderSection(sectionId) {
  const sections = [
    "completed-orders-section",
    "shipped-orders-section",
    "delivered-orders-section",
    "returned-orders-section",
  ];

  const buttons = [
    "show-completed-btn",
    "show-shipped-btn",
    "show-delivered-btn",
    "show-returned-btn",
  ];

  // Loop through all sections
  sections.forEach((id) => {
    const section = document.getElementById(id);
    if (section) {
      if (id === sectionId) {
        section.classList.remove("hidden"); // Show the selected section
      } else {
        section.classList.add("hidden"); // Hide the others
      }
    }
  });

  // Update button styles
  buttons.forEach((btnId) => {
    const button = document.getElementById(btnId);
    if (button) {
      if (btnId === `show-${sectionId.split("-")[0]}-btn`) {
        button.style.backgroundColor = "#6a64f142"; // Highlight active button
      } else {
        button.style.backgroundColor = ""; // Reset others
      }
    }
  });
}

//
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
$(document).ready(function () {
  // Search functionality for all three sections
  $("#sub-btn-del").click(function () {
    const searchType = $("#category").val(); // Get selected search type
    const searchValue = $("#product-id-input-del").val().toLowerCase(); // Get the search input value

    if (searchValue === "") {
      // Show SweetAlert with no confirm button
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "warning",
        title: "Please enter a search term.",
        showConfirmButton: false,
        timer: 1500, // Auto-close after 1.5 seconds
      });

      return;
    }

    let found = false;

    // Hide all rows initially
    $(
      "#orders-table-body tr, #completed-orders-table-body tr, #shipped-orders-table-body tr, #delivered-orders-table-body tr, #returned-orders-table-body tr"
    ).hide();
    $(
      "#completed-orders-section #shipped-orders-section, #delivered-orders-section,#returned-orders-section"
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
      "#orders-table-body tr, #completed-orders-table-body tr, #shipped-orders-table-body tr, #delivered-orders-table-body tr, #returned-orders-table-body tr"
    ).each(function () {
      const row = $(this);
      const cellValue = row.find("td").eq(columnIndex).text().toLowerCase();

      if (cellValue.includes(searchValue)) {
        row.show(); // Show only the rows that match
        found = true;

        // Show the section where the result is found
        if (row.closest("tbody").is("#orders-table-body")) {
          $("#completed-orders-section").removeClass("hidden");
          // Apply background color to the "Pending" button
          $("#show-completed-btn")
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
        } else if (row.closest("tbody").is("#shipped-orders-table-body")) {
          $("#shipped-orders-section").removeClass("hidden");
          // Apply background color to the "Completed" button
          $("#completed-orders-section").addClass("hidden");
          $("#show-shipped-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#returned-orders-table-body")) {
          $("#returned-orders-section").removeClass("hidden");
          $("#completed-orders-section").addClass("hidden");
          // Apply background color to the "Completed" button
          $("#show-returned-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        } else if (row.closest("tbody").is("#delivered-orders-table-body")) {
          $("#delivered-orders-section").removeClass("hidden");
          $("#completed-orders-section").addClass("hidden");
          // Apply background color to the "Completed" button
          $("#show-delivered-btn")
            .css("background-color", "#6a64f142")
            .siblings()
            .css("background-color", "");
        }
      }
    });

    if (!found) {
      // Show SweetAlert with no confirm button
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "No matching orders found.",
        showConfirmButton: false,
        timer: 1500, // Auto-close after 1.5 seconds
      });
    }
  });

  // Reset search functionality when input changes
  $("#product-id-input-del").on("input", function () {
    const searchValue = $(this).val();

    if (searchValue === "") {
      $("#orders-table-body tr").show();
      $("#completed-orders-table-body tr").show();
      $("#shipped-orders-table-body tr").show();
      $("#delivered-orders-table-body tr").show();
      $("#returned-orders-table-body tr").show();

      // Show all sections
      $("#completed-orders-section").addClass("hidden");
      $("#shipped-orders-section").addClass("hidden");
      $("#delivered-orders-section").addClass("hidden");
      $("#returned-orders-section").addClass("hidden");

      $("#completed-orders-section").removeClass("hidden");

      // Reset button background colors
      $(
        "#show-completed-btn,#show-shipped-btn,#show-delivered-btn,#show-returned-btn"
      ).css("background-color", "");

      // Clear the search input
      $("#product-id-input-del").val("");
    }
  });
});
