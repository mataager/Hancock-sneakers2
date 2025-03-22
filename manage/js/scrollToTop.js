// Show or Hide Scroll Button
window.onscroll = function () {
  const scrollBtn = document.getElementById("scrollTopBtn");
  if (document.documentElement.scrollTop > 300) {
    scrollBtn.classList.add("show");
    scrollBtn.classList.remove("hide");
  } else {
    scrollBtn.classList.add("hide");
    setTimeout(() => scrollBtn.classList.remove("show"), 300); // Hide after transition
  }
};

// Scroll to Top Function
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
