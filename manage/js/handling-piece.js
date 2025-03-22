// Define the pieces object containing different categories and their respective pieces
const pieces = {
  men: [
    { value: "T-Shirt", text: "T-Shirt" },
    { value: "Polo-Shirt", text: "Polo-Shirt" },
    { value: "Shirt", text: "Shirt" },
    { value: "Tank-top", text: "Tank-top" },
    { value: "Sweatshirt", text: "Sweatshirt" },
    { value: "Hoodie", text: "Hoodie" },
    { value: "Knitwear", text: "Knitwear" },
    { value: "Jacket", text: "Jacket" },
    { value: "Hoodies", text: "Hoodies" },
    { value: "Trousers", text: "Trousers" },
    { value: "Jeans", text: "Jeans" },
    { value: "Short", text: "Short" },
    { value: "Swimwear", text: "Swimwear" },
    { value: "Jogger", text: "Jogger" },
    { value: "Sweatpants", text: "Sweatpants" },
    { value: "Underwear", text: "Underwear" },
    { value: "Socks", text: "Socks" },
    { value: "Shoes", text: "Shoes" },
    { value: "Caps", text: "Caps" },
    { value: "Slipper", text: "Slipper" },
  ],
  women: [
    { value: "T-Shirt", text: "T-Shirt" },
    { value: "Polo-Shirt", text: "Polo-Shirt" },
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
    { value: "Caps", text: "Caps" },
    { value: "Shoes", text: "Shoes" },
    { value: "Slipper", text: "Slipper" },
    { value: "Heels", text: "Heels" },
  ],
  kids: [
    { value: "T-Shirt", text: "T-Shirt" },
    { value: "Polo-Shirt", text: "Polo-Shirt" },
    { value: "Shirt", text: "Shirt" },
    { value: "Blouse", text: "Blouse" },
    { value: "Cardigan", text: "Cardigan" },
    { value: "Dress", text: "Dress" },
    { value: "Tank-top", text: "Tank-top" },
    { value: "Sweatshirt", text: "Sweatshirt" },
    { value: "Hoodie", text: "Hoodie" },
    { value: "Knitwear", text: "Knitwear" },
    { value: "Jacket", text: "Jacket" },
    { value: "Hoodies", text: "Hoodies" },
    { value: "Trousers", text: "Trousers" },
    { value: "Jeans", text: "Jeans" },
    { value: "Short", text: "Short" },
    { value: "Swimwear", text: "Swimwear" },
    { value: "Jumpsuit", text: "Jumpsuit" },
    { value: "Skirt", text: "Skirt" },
    { value: "Bikini", text: "Bikini" },
    { value: "Jogger", text: "Jogger" },
    { value: "Sweatpants", text: "Sweatpants" },
    { value: "Underwear", text: "Underwear" },
    { value: "Socks", text: "Socks" },
    { value: "Caps", text: "Caps" },
    { value: "Shoes", text: "Shoes" },
    { value: "Slipper", text: "Slipper" },
  ],
};

// Define the arrays of piece types for categorization
const topPieces = [
  "T-Shirt",
  "Polo-Shirt",
  "Shirt",
  "Tank-top",
  "Sweatshirt",
  "Hoodie",
  "Knitwear",
  "Jacket",
  "Hoodies",
  "Blouse",
  "Cardigan",
  "Caps",
];

const bottomPieces = [
  "Trousers",
  "Jeans",
  "Swimwear",
  "Jogger",
  "Sweatpants",
  "Short",
  "Skirt",
  "Bikini",
  "Socks",
];

const mixPieces = ["Dress", "Jumpsuit"];

const footwearPieces = ["Shoes", "Slipper", "Heels"];

// Function to update the piece dropdown options based on selected category
function updatePieceOptions(categorySelect, pieceSelect, typeSelect) {
  const selectedCategory = categorySelect.value;
  let options = pieces[selectedCategory] || [];

  pieceSelect.innerHTML = ""; // Clear existing options

  // Populate the piece dropdown with new options
  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    pieceSelect.appendChild(optionElement);
  });

  // Additional logic to set all women pieces if category is women in add-product-form
  if (
    categorySelect.form.id === "add-product-form" &&
    selectedCategory === "women"
  ) {
    pieceSelect.innerHTML = ""; // Clear existing options for women
    options.forEach((piece) => {
      const optionElement = document.createElement("option");
      optionElement.value = piece.value;
      optionElement.textContent = piece.text;
      pieceSelect.appendChild(optionElement);
    });
  }

  // Call the function to update the Type dropdown based on the initial piece selection
  updateType(categorySelect, pieceSelect, typeSelect);
}

// Function to update the type dropdown based on selected piece
function updateType(categorySelect, pieceSelect, typeSelect) {
  const selectedPiece = pieceSelect.value;

  let type = "";

  if (topPieces.includes(selectedPiece)) {
    type = "Top";
  } else if (bottomPieces.includes(selectedPiece)) {
    type = "Bottom";
  } else if (mixPieces.includes(selectedPiece)) {
    type = "Mix";
  } else if (footwearPieces.includes(selectedPiece)) {
    type = "Footwear";
  } else {
    type = ""; // Reset the Type selection if no match
  }

  typeSelect.value = type;
}

// Function to initialize the dropdowns and add event listeners
function initializeDropdowns(categorySelect, pieceSelect, typeSelect) {
  categorySelect.addEventListener("change", () =>
    updatePieceOptions(categorySelect, pieceSelect, typeSelect)
  );
  pieceSelect.addEventListener("change", () =>
    updateType(categorySelect, pieceSelect, typeSelect)
  );

  // Initial load
  updatePieceOptions(categorySelect, pieceSelect, typeSelect);
}

// Initialize the dropdown elements for add-product-form only
const addProductForm = document.getElementById("add-product-form");

const categorySelect = addProductForm.querySelector("#category");
const pieceSelect = addProductForm.querySelector("#Piece");
const typeSelect = addProductForm.querySelector("#Type");

// Initialize the dropdowns with their respective elements
initializeDropdowns(categorySelect, pieceSelect, typeSelect);
