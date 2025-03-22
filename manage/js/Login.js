//login
const loginUser = async (username, password) => {
  try {
    // Hide previous error messages
    document.getElementById("usernameError").classList.add("hidden");
    document.getElementById("passwordError").classList.add("hidden");

    // Show spinner inside button
    document.getElementById("sub-txt").classList.add("hidden");
    document.getElementById("sub-spin").classList.remove("hidden");

    // Sign in with email and password
    const userCredential = await auth.signInWithEmailAndPassword(
      username,
      password
    );
    const user = userCredential.user;
    const subscriptionActive = await checkSubscription(user);
    if (!subscriptionActive) {
      // Stop login flow if subscription is expired
      document.getElementById("sub-txt").classList.remove("hidden");
      document.getElementById("sub-spin").classList.add("hidden");
      return;
    }
    const uid = user.uid;
    const createdAt = user.metadata.creationTime;
    const lastSignInTime = user.metadata.lastSignInTime;
    const displayName = user.displayName;

    // Store user info in local storage
    localStorage.setItem("uid", uid);
    localStorage.setItem("displayName", displayName);
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("createdAt", createdAt);
    localStorage.setItem("lastSignInTime", lastSignInTime);

    // Get ID token
    const idToken = await user.getIdToken();

    // Fetch store info
    const storeResponse = await fetch(
      `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/store-info.json?auth=${idToken}`
    );
    const storeData = await storeResponse.json();

    if (storeData) {
      // Store plan type and ending date in local storage
      localStorage.setItem("planType", storeData.plan);
      localStorage.setItem("endingDate", storeData["ending-date"]);
    }
    redirectToMainPage();
  } catch (error) {
    Swal.fire({
      icon: "error",
      text: error.message,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 10000, // Auto-close after 3 seconds
      timerProgressBar: true, // Show progress bar
    });
    console.error("Login Error:", error.message);

    // Hide spinner and show text again
    document.getElementById("sub-txt").classList.remove("hidden");
    document.getElementById("sub-spin").classList.add("hidden");

    Swal.fire({
      icon: "info",
      text: "It Seems That You Had Entered Incorrect Email Or Password",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000, // Auto-close after 3 seconds
      timerProgressBar: true, // Show progress bar
    });
  }
};
// Function to send a password reset email
async function sendResetEmail() {
  const forgotPasswordLink = document.getElementById("forgotPasswordLink");
  const preloader = document.getElementById("sub-spin-resetMessage");
  const resetMessage = document.getElementById("resetMessage");
  const usernameError = document.getElementById("usernameError");
  const usernameInput = document.getElementById("username"); // Get the input field

  try {
    const email = usernameInput.value.trim(); // Get email from input

    // Hide previous messages
    resetMessage.classList.add("hidden");
    usernameError.classList.add("hidden");

    // Check if the email field is empty
    if (!email) {
      usernameError.textContent =
        "Please enter your email address to send the Password reset link.";
      usernameError.classList.remove("hidden");
      setTimeout(() => {
        usernameError.classList.add("showinbut");
      }, 10); // Delay to ensure transition
      return;
    }

    // Disable and hide the "Forgot Password?" link
    forgotPasswordLink.classList.add("hidden");

    // Show preloader
    preloader.classList.remove("hidden");

    // // Call Firebase's sendPasswordResetEmail method
    // const sendEmailPromise = auth.sendPasswordResetEmail(email);
    // const delayPromise = new Promise((resolve) => setTimeout(resolve, 5000)); // Ensures at least 5 sec delay

    // // Wait for both the email to send and the 5-second delay
    // await Promise.all([sendEmailPromise, delayPromise]);

    // // Hide preloader and update the "Forgot Password?" link
    // preloader.classList.add('hidden');
    // forgotPasswordLink.textContent = "Resend Again!";
    // forgotPasswordLink.classList.remove('hidden');
    // setTimeout(() => {
    //     forgotPasswordLink.classList.add('showinbut');
    // }, 10); // Delay to ensure transition

    // // Display success message
    // resetMessage.textContent = "Password reset link sent successfully!";
    // resetMessage.classList.remove('hidden');
    // setTimeout(() => {
    //     resetMessage.classList.add('showinbut');
    // }, 1000); // Delay to ensure transition
    // resetMessage.classList.add('success');
    // Call Firebase's sendPasswordResetEmail method
    const sendEmailPromise = auth.sendPasswordResetEmail(email);
    const delayPromise = new Promise((resolve) => setTimeout(resolve, 5000)); // Ensures at least 5 sec delay

    // Wait for both the email to send and the 5-second delay
    await Promise.all([sendEmailPromise, delayPromise]);

    // Hide preloader
    preloader.classList.add("hidden");

    // Delay success message until preloader is fully hidden
    setTimeout(() => {
      // Update the "Forgot Password?" link
      forgotPasswordLink.textContent = "Resend Again!";
      forgotPasswordLink.classList.remove("hidden");

      setTimeout(() => {
        forgotPasswordLink.classList.add("showinbut");
      }, 10); // Delay to ensure transition

      // Display success message
      resetMessage.textContent = "Password reset link sent successfully!";
      resetMessage.classList.remove("hidden");

      setTimeout(() => {
        resetMessage.classList.add("showinbut");
      }, 10); // Delay to ensure transition

      resetMessage.classList.add("success");
    }, 300); // Small delay after hiding preloader
  } catch (error) {
    console.error("Error sending reset email:", error.message);

    // Hide preloader and re-enable the "Forgot Password?" link
    preloader.classList.add("hidden");
    forgotPasswordLink.classList.remove("hidden");
    setTimeout(() => {
      forgotPasswordLink.classList.add("showinbut");
    }, 10); // Delay to ensure transition

    let errorMessage;
    if (error.code === "auth/invalid-email") {
      errorMessage = "Invalid email format.";
    } else if (error.code === "auth/user-not-found") {
      errorMessage = "No user found with this email.";
    } else {
      errorMessage = "Something went wrong. Please try again later.";
    }

    // Display error message
    usernameError.textContent = errorMessage;
    usernameError.classList.remove("hidden");
    setTimeout(() => {
      usernameError.classList.add("showinbut");
    }, 10); // Delay to ensure transition
  }
}
// // Event listener for form submission
document.getElementById("LogIn").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent the default form submission

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  // Clear previous error messages
  document.getElementById("usernameError").classList.add("hidden");
  document.getElementById("passwordError").classList.add("hidden");

  // Check if username is empty
  if (username === "") {
    document.getElementById("usernameError").textContent =
      "Email field is required!";
    document.getElementById("usernameError").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("usernameError").classList.add("showinbut");
    }, 10);
    return;
  }

  // Check if password is empty
  if (password === "") {
    document.getElementById("passwordError").textContent =
      "Password field is required!";
    document.getElementById("passwordError").classList.remove("hidden");
    setTimeout(() => {
      document.getElementById("passwordError").classList.add("showinbut");
    }, 10);
    return;
  }
  // Call login function
  else {
    loginUser(username, password);
  }
});

function redirectToMainPage() {
  if (window.location.replace) {
    window.location.replace("./main.html");
  } else {
    // Fallback for browsers that don't support window.location.replace
    window.location.href = "./main.html";
  }
}
