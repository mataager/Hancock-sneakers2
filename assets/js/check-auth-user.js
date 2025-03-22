// function checkUserAuthentication() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (!user) {
//       Swal.fire({
//         icon: "warning",
//         title: "You must sign in first",
//         text: "Please sign in to complete your order.",
//         confirmButtonText: "Go to Account",
//         allowOutsideClick: false, // Prevent closing by clicking outside
//         allowEscapeKey: false, // Prevent closing with Escape key
//       }).then((result) => {
//         if (result.isConfirmed) {
//           window.location.href = "./account.html"; // Redirect user to account page
//         }
//       });
//     }
//   });
// }

// // Call the function when the page loads
// document.addEventListener("DOMContentLoaded", checkUserAuthentication);

//

function checkUserAuthentication() {
  const addressSection = document.getElementById("address-sec"); // Get the address section

  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      // Hide the address section if the user is not authenticated
      addressSection.style.display = "none";

      Swal.fire({
        icon: "warning",
        title: "You must sign in first",
        text: "Please sign in to complete your order.",
        showCancelButton: true, // Show a cancel button
        confirmButtonText: "Go to Account", // Text for the sign-in button
        cancelButtonText: "Continue Without Signing In", // Text for the continue button
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing with Escape key
        customClass: {
          actions: "swal2-vertical-buttons", // Custom class for vertical buttons
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // Redirect to the account page if the user chooses to sign in
          window.location.href = "./account.html";
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Show a form for name, phone number, and address
          showGuestForm();
        }
      });
    } else {
      // User is signed in, show the address section
      addressSection.style.display = "block";

      // Proceed with the order
      console.log("User is signed in:", user);
      proceedWithOrder();
    }
  });
}

function showGuestForm() {
  Swal.fire({
    title: "Enter Your Details",
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="Name" required>` +
      `<input id="swal-input2" class="swal2-input" placeholder="Phone Number" required>` +
      `<input id="swal-input3" class="swal2-input" placeholder="Address" required>`,
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

      // Validate inputs
      if (!name || !phone || !address) {
        Swal.showValidationMessage("Please fill out all fields.");
        return false;
      }

      // Return the data
      return { name, phone, address };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      // Handle the submitted data
      const guestDetails = result.value;
      console.log("Guest Details:", guestDetails);
      // Save guest details to localStorage or proceed with the order
      localStorage.setItem("guestDetails", JSON.stringify(guestDetails));
      proceedWithOrder();
    }
  });
}
