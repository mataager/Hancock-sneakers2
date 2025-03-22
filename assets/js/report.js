
document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");

  // Add the modal HTML structure to the body
  body.insertAdjacentHTML(
    "beforeend",
    `
    <div class="modal" id="bug-modal">
      <div class="modal-report-content">
        <div class="flex align-items flex-end width-available">
          <span class="close-btn pointer" id="close-modal"><i class="bi bi-x-lg"></i></span>
        </div>
        <h2 class="mr-20">Report a Problem</h2>
        <form class="width-available" id="bug-form">
          <div class="flex center align-items flex-direction-column m-20">
            <h4 for="customer-name" class="h5-form m-5">Name</h4>
            <input type="text" id="customer-name" required class="input-report width-70-percent">
          </div>
          <div class="flex center align-items flex-direction-column m-20">
            <h4 for="customer-phoneNumber" class="h5-form m-5">Phone Number</h4>
            <input type="text" id="customer-phoneNumber" required class="input-report width-70-percent">
          </div>
          <div class="flex center flex-direction-column m-20">
            <h4 for="problem-description" class="h5-form m-5">Describe the problem</h4>
            <textarea id="problem-description" rows="4" name="text" required class="input-cart textarea-address input-report"></textarea>
          </div>
          <div class="flex center m-5">
            <button class="btn2" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    `
  );

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

  const reportBugBtn = document.getElementById("report-bug-btn");
  const bugModal = document.getElementById("bug-modal");
  const closeModal = document.getElementById("close-modal");
  const bugForm = document.getElementById("bug-form");

  // Open the modal when "Report a bug" is clicked
  reportBugBtn.addEventListener("click", function (e) {
    e.preventDefault();
    bugModal.classList.add("show"); // Add 'show' class to make the modal visible
  });

  // Close the modal when the close button is clicked
  closeModal.addEventListener("click", function () {
    bugModal.classList.remove("show"); // Remove 'show' class to hide the modal
  });

  // Close the modal if the user clicks outside of the modal content
  window.addEventListener("click", function (e) {
    if (e.target === bugModal) {
      bugModal.classList.remove("show"); // Hide modal when clicking outside the content
    }
  });

  // Handle user sign-in via Google
  async function googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const result = await firebase.auth().signInWithPopup(provider);
      Swal.fire({
        icon: "success",
        title: "Signed in successfully!",
        showConfirmButton: false,
        timer: 1500, // Close the alert after 1.5 seconds
      });
      return result.user;
    } catch (error) {
      console.error("Error signing in:", error);
      Swal.fire({
        icon: "error",
        title: "Sign In Failed",
        text: "There was a problem signing you in. Please try again!",
        showConfirmButton: false,
        timer: 1500,
      });
      return null;
    }
  }

  // Submit the form and send the data to Firebase
  bugForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Check if user is authenticated
    const user = firebase.auth().currentUser;

    if (!user) {
      // If not signed in, prompt Google sign-in
      const signedInUser = await googleSignIn();
      if (!signedInUser) return; // Stop submission if sign-in failed
    }

    // If already signed in, get the user token
    const idToken = await firebase.auth().currentUser.getIdToken();

    const customerName = document.getElementById("customer-name").value;
    const phoneNumber = document.getElementById("customer-phoneNumber").value;
    const problemDescription = document.getElementById(
      "problem-description"
    ).value;

    const requestBody = {
      customerName: customerName,
      email: user.email,
      phoneNumber: phoneNumber,
      problemDescription: problemDescription,
      submittedAt: new Date().toISOString(),
    };

    // Send the data to Firebase, including the user token in the URL
    fetch(`${url}/Stores/${uid}/reports.json?auth=${idToken}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => response.json())
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Report Submitted!",
          text: "Your report has been successfully submitted.",
          showConfirmButton: false,
          timer: 3000, // Auto close after 3 seconds
        });
        bugModal.classList.remove("show"); // Hide modal after successful submission
        bugForm.reset(); // Reset the form
      })
      .catch((error) => {
        console.error("Error reporting the problem:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "There was an issue submitting your report. Please try again.",
        });
      });
  });
});


