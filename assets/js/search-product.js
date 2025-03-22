document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("search-btn");
  const searchBox = document.getElementById("search-box");
  const searchInput = document.getElementById("search-input");
  const suggestionsBox = document.getElementById("suggestions");

  // Define the pieces object (provided data)
  const pieces = {
    men: [
      { value: "T-shirt", text: "T-shirt" },
      { value: "Polo-shirt", text: "Polo-shirt" },
      { value: "Shirt", text: "Shirt" },
      { value: "Tank-top", text: "Tank-top" },
      { value: "Sweatshirt", text: "Sweatshirt" },
      { value: "Hoodie", text: "Hoodie" },
      { value: "Knitwear", text: "Knitwear" },
      { value: "Jacket", text: "Jacket" },
      { value: "Trousers", text: "Trousers" },
      { value: "Jeans", text: "Jeans" },
      { value: "Short", text: "Short" },
      { value: "Swimwear", text: "Swimwear" },
      { value: "Jogger", text: "Jogger" },
      { value: "Sweatpants", text: "Sweatpants" },
      { value: "Underwear", text: "Underwear" },
      { value: "Socks", text: "Socks" },
      { value: "Shoes", text: "Shoes" },
      { value: "Slipper", text: "Slipper" },
    ],
    women: [
      { value: "T-shirt", text: "T-shirt" },
      { value: "Tank-top", text: "Tank-top" },
      { value: "Shirt", text: "Shirt" },
      { value: "Blouse", text: "Blouse" },
      { value: "Cardigan", text: "Cardigan" },
      { value: "Dress", text: "Dress" },
      { value: "Sweatshirt", text: "Sweatshirt" },
      { value: "Hoodie", text: "Hoodie" },
      { value: "Knitwear", text: "Knitwear" },
      { value: "Jumpsuit", text: "Jumpsuit" },
      { value: "Trousers", text: "Trousers" },
      { value: "Jeans", text: "Jeans" },
      { value: "Short", text: "Short" },
      { value: "Jogger", text: "Jogger" },
      { value: "Sweatpants", text: "Sweatpants" },
      { value: "Skirt", text: "Skirt" },
      { value: "Bikini", text: "Bikini" },
      { value: "Underwear", text: "Underwear" },
      { value: "Socks", text: "Socks" },
      { value: "Shoes", text: "Shoes" },
      { value: "Slipper", text: "Slipper" },
    ],
    kids: [{ value: "Coming soon", text: "Coming soon" }],
  };

  // Toggle visibility of the search box when the search button is clicked
  searchBtn.addEventListener("click", function () {
    searchBox.classList.toggle("hidden-search-box");
  });

  // Close the search box if the user clicks outside of it
  window.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
      searchBox.classList.add("hidden-search-box");
    }
  });

  // Handle search input when user clicks the inner search button
  const innerSearchBtn = document.querySelector(".search-btn");
  innerSearchBtn.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent form submission if it's in a form

    const searchValue = searchInput.value.trim().toLowerCase(); // Get the input value

    if (searchValue) {
      // Normalize and find exact matches
      let matchFound = false;

      for (let category in pieces) {
        pieces[category].forEach((item) => {
          if (item.value.toLowerCase() === searchValue) {
            matchFound = true;
            const piece = item.text;

            // Capitalize the first letter of each word for hyphenated words
            const formattedPiece = piece
              .split("-")
              .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
              .join("-");

            // Build the URL with the piece parameter
            let url = `./Category.html?piece=${encodeURIComponent(
              formattedPiece
            )}`;

            // Redirect to the dynamically constructed URL
            window.location.href = url;
          }
        });
      }

      if (!matchFound) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No matching piece found!",
          showConfirmButton: false, // Hide the "OK" button
          timer: 1500, // Auto-close after 1.5 seconds
        });
      }
    } else {
      searchInput.classList.add("shake");
      setTimeout(() => searchInput.classList.remove("shake"), 1000);
    }
  });

  // Listen for input event on search field for suggestions
  searchInput.addEventListener("input", function () {
    const searchValue = searchInput.value.trim().toLowerCase();
    suggestionsBox.innerHTML = ""; // Clear previous suggestions

    if (searchValue) {
      let suggestions = [];

      // Search through pieces
      for (let category in pieces) {
        pieces[category].forEach((piece) => {
          if (
            piece.value.toLowerCase().includes(searchValue) &&
            !suggestions.includes(piece.text)
          ) {
            suggestions.push(piece.text);
          }
        });
      }

      // If we have suggestions, show them with transition
      if (suggestions.length > 0) {
        suggestionsBox.classList.add("show"); // Show suggestions with transition
        suggestions.forEach((suggestion) => {
          const suggestionItem = document.createElement("li");
          suggestionItem.classList.add("suggestion-item");
          suggestionItem.textContent = suggestion;
          suggestionsBox.appendChild(suggestionItem);

          // When a suggestion is clicked, set it as the input value and perform search
          suggestionItem.addEventListener("click", function () {
            searchInput.value = suggestion;
            suggestionsBox.classList.remove("show"); // Hide suggestions after selection
            performSearch(suggestion); // Perform the search based on the suggestion
          });
        });
      } else {
        suggestionsBox.classList.remove("show"); // Hide if no suggestions
      }
    } else {
      suggestionsBox.classList.remove("show"); // Hide if input is empty
    }
  });

  // Hide suggestions if clicking outside the search box
  document.addEventListener("click", function (e) {
    if (!searchBox.contains(e.target)) {
      suggestionsBox.classList.remove("show"); // Hide suggestions when clicking outside
    }
  });

  function performSearch(query) {
    // Modify the function to perform search based on the suggestion
    const searchValue = query.trim().toLowerCase();

    if (searchValue) {
      let matchFound = false;

      for (let category in pieces) {
        pieces[category].forEach((item) => {
          if (item.value.toLowerCase() === searchValue) {
            matchFound = true;
            const piece = item.text;

            // Capitalize the first letter of each word for hyphenated words
            const formattedPiece = piece
              .split("-")
              .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
              .join("-");

            // Build the URL with the piece parameter
            let url = `./Category.html?piece=${encodeURIComponent(
              formattedPiece
            )}`;

            // Redirect to the dynamically constructed URL
            window.location.href = url;
          }
        });
      }

      if (!matchFound) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No matching piece found!",
          showConfirmButton: false, // Hide the "OK" button
          timer: 1500, // Auto-close after 1.5 seconds
        });
      }
    }
  }
});
