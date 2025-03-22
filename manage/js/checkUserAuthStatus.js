function checkAuthAndRedirect() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
    } else {
      window.location.href = "./index.html"; // Adjust the URL as needed
    }
  });
}
