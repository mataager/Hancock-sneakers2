document.addEventListener("DOMContentLoaded", function () {
  // Select elements
  const overlay = document.querySelector("[data-overlay]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const megaMenu = document.querySelector("[data-mega-menu]");

  // Event listeners for opening and closing the navbar
  navOpenBtn.addEventListener("click", function () {
    navbar.classList.add("active");
    overlay.classList.add("active");
  });

  navCloseBtn.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });

  overlay.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
  });

  const elements = document.querySelectorAll("#free-shipping");

  elements.forEach((element) => {
    element.innerHTML = `${freeshipping}`;
  });

  // Prevent closing the navbar when clicking inside the mega menu
  if (megaMenu) {
    megaMenu.addEventListener("click", function (event) {
      event.stopPropagation(); // Prevent click from propagating to the document
    });
  }

  // Handle category selection
  const showMenu = function (category) {
    const menMenu = document.getElementById("men-menu");
    const womenMenu = document.getElementById("women-menu");
    const kidsMenu = document.getElementById("kids-menu");
    const menLabel = document.getElementById("men-label");
    const womenLabel = document.getElementById("women-label");
    const kidsLabel = document.getElementById("kids-label");

    // Hide all menus and reset labels
    menMenu.classList.add("hidden");
    womenMenu.classList.add("hidden");
    kidsMenu.classList.add("hidden");
    menLabel.style.fontWeight = "400";
    womenLabel.style.fontWeight = "400";
    kidsLabel.style.fontWeight = "400";

    // Show the selected category menu and highlight the label
    if (category === "men") {
      menMenu.classList.remove("hidden");
      menLabel.style.fontWeight = "700";
    } else if (category === "women") {
      womenMenu.classList.remove("hidden");
      womenLabel.style.fontWeight = "700";
    } else if (category === "kids") {
      kidsMenu.classList.remove("hidden");
      kidsLabel.style.fontWeight = "700";
    }
  };

  // Add event listeners to category labels
  document.getElementById("men-label").addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from propagating to the document
    showMenu("men");
  });

  document
    .getElementById("women-label")
    .addEventListener("click", function (e) {
      e.stopPropagation(); // Prevent click from propagating to the document
      showMenu("women");
    });

  document.getElementById("kids-label").addEventListener("click", function (e) {
    e.stopPropagation(); // Prevent click from propagating to the document
    showMenu("kids");
  });

  // Handle scroll behavior
  const header = document.querySelector("[data-header]");
  const goTopBtn = document.querySelector("[data-go-top]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 80) {
      header.classList.add("active");
      goTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      goTopBtn.classList.remove("active");
    }
  });
});
//handle page title
document.getElementById("store-title").innerHTML = storename;

//
// The function to handle the redirection
function brand(brandName) {
  const encodedBrand = encodeURIComponent(brandName); // Ensure URL safety
  window.location.href = `brand.html?brand=${encodedBrand}`;
}
