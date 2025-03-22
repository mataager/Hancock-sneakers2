// Function to check subscription status
async function checkSubscription(user) {
  try {
    // Get the ID token
    const idToken = await user.getIdToken();
    const uid = user.uid; // Get the user's UID

    // Construct the URL with the user's UID
    const url = `https://matager-f1f00-default-rtdb.firebaseio.com/Stores/${uid}/store-info/ending-date.json?auth=${idToken}`;

    // Fetch the subscription ending date
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${idToken}` }, // Send token for authentication
    });

    if (!response.ok) {
      throw new Error("Failed to fetch subscription data.");
    }

    const endingDateStr = await response.json();
    if (!endingDateStr) {
      console.log("No subscription ending date found.");
      return false;
    }

    // Parse the date correctly (DD/MM/YYYY, hh:mm:ss a)
    const [datePart, timePart] = endingDateStr.split(", ");
    const [day, month, year] = datePart.split("/"); // Correct order for parsing
    const formattedDateStr = `${year}-${month}-${day} ${timePart}`; // Convert to YYYY-MM-DD format
    const endDate = new Date(formattedDateStr);

    // Get current date
    const now = new Date();

    if (isNaN(endDate.getTime())) {
      console.error("Invalid date format:", endingDateStr);
      return false;
    }

    if (endDate >= now) {
      console.log("✅ Subscription is active.");
      return true;
    } else {
      let timeLeft = 10; // 30 seconds countdown

      Swal.fire({
        icon: "error",
        title: "Subscription Expired",
        html: `<p class="font-sm">Your subscription has expired. This tap closes in <b>${timeLeft}</b> seconds...</p>`, // Dynamic countdown
        toast: true, // Make it a toast notification
        position: "top-end", // Position it at the top-right
        showConfirmButton: false, // Hide confirmation button
        timer: timeLeft * 1000, // Auto close after countdown ends
        timerProgressBar: true, // Show a progress bar
        allowOutsideClick: false, // Prevent closing by clicking outside
        allowEscapeKey: false, // Prevent closing with Escape key
        didOpen: () => {
          const timerInterval = setInterval(() => {
            timeLeft--;
            Swal.update({
              html: `<p class="font-sm">Your subscription has expired. This tap closes in <b>${timeLeft}</b> seconds...</p>`,
            });

            if (timeLeft <= 0) {
              clearInterval(timerInterval);
              Swal.close(); // Close the alert after countdown
            }
          }, 1000);
        },
      });

      return false;
    }
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
}
