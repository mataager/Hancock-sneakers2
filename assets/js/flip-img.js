// Function to detect if the device is a mobile device
function isMobileDevice() {
  return /Mobi|Android/i.test(navigator.userAgent);
}

// Function to setup hover effect for a product item
function setupHoverEffect(productItem) {
  // Only proceed if not a mobile device
  if (!isMobileDevice()) {
    // Get the images inside the current product item
    var images = productItem.querySelectorAll(".image-contain");

    // Function to show the second image
    function showSecondImage() {
      images[0].style.display = "none";
      images[1].style.display = "block";
    }

    // Function to show the first image
    function showFirstImage() {
      images[0].style.display = "block";
      images[1].style.display = "none";
    }

    // Add event listener for mouseenter (hover in)
    productItem.addEventListener("mouseenter", showSecondImage);

    // Add event listener for mouseleave (hover out)
    productItem.addEventListener("mouseleave", showFirstImage);
  }
}
