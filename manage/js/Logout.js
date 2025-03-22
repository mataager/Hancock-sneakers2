document.addEventListener("DOMContentLoaded", function () {
  const logoutLink = document.getElementById("logoutLink");

  logoutLink.addEventListener("click", function (event) {
    event.preventDefault();

    // Clear all local storage data
    localStorage.clear();

    auth
      .signOut()
      .then(() => {
        // Sign-out successful
        //  console.log("User signed out successfully.");
        window.location.href = "./index.html"; // Redirect to login page after logout
      })
      .catch((error) => {
        // An error happened
        console.error("Sign out error:", error);
      });
  });
});

// Firebase initialization code as shown above
