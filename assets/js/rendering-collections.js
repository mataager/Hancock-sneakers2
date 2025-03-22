
// // Function to toggle the visibility of collection areas
// function renderCollections() {
//   // Men Collection
//   const menArea = document.getElementById("men-area");
//   if (!showMen && menArea) {
//     menArea.classList.add("hidden");
//   } else if (menArea) {
//     menArea.classList.remove("hidden");
//   }

//   // Women Collection
//   const womenArea = document.getElementById("women-area");
//   if (!showWomen && womenArea) {
//     womenArea.classList.add("hidden");
//   } else if (womenArea) {
//     womenArea.classList.remove("hidden");
//   }

//   // Kids Collection
//   const kidsArea = document.getElementById("kids-area");
//   if (!showKids && kidsArea) {
//     kidsArea.classList.add("hidden");
//   } else if (kidsArea) {
//     kidsArea.classList.remove("hidden");
//   }
// }

// // Call the function to render collections
// renderCollections();





// Function to toggle the visibility of collection areas based on gender and store type
function renderCollections() {
    // Men Collection
    const menArea = document.getElementById("men-area");
    const menFootwearArea = document.getElementById("men-footware-area");

    if (showMen) {
        if (storeType === "clothing") {
            if (menArea) menArea.classList.remove("hidden");
            if (menFootwearArea) menFootwearArea.classList.add("hidden");
        } else if (storeType === "footwear") {
            if (menFootwearArea) menFootwearArea.classList.remove("hidden");
            if (menArea) menArea.classList.add("hidden");
        }
    } else {
        if (menArea) menArea.classList.add("hidden");
        if (menFootwearArea) menFootwearArea.classList.add("hidden");
    }

    // Women Collection
    const womenArea = document.getElementById("women-area");
    const womenFootwearArea = document.getElementById("women-footware-area");

    if (showWomen) {
        if (storeType === "clothing") {
            if (womenArea) womenArea.classList.remove("hidden");
            if (womenFootwearArea) womenFootwearArea.classList.add("hidden");
        } else if (storeType === "footwear") {
            if (womenFootwearArea) womenFootwearArea.classList.remove("hidden");
            if (womenArea) womenArea.classList.add("hidden");
        }
    } else {
        if (womenArea) womenArea.classList.add("hidden");
        if (womenFootwearArea) womenFootwearArea.classList.add("hidden");
    }

    // Kids Collection
    const kidsArea = document.getElementById("kids-area");
    const kidsFootwearArea = document.getElementById("kids-footware-area");

    if (showKids) {
        if (storeType === "clothing") {
            if (kidsArea) kidsArea.classList.remove("hidden");
            if (kidsFootwearArea) kidsFootwearArea.classList.add("hidden");
        } else if (storeType === "footwear") {
            if (kidsFootwearArea) kidsFootwearArea.classList.remove("hidden");
            if (kidsArea) kidsArea.classList.add("hidden");
        }
    } else {
        if (kidsArea) kidsArea.classList.add("hidden");
        if (kidsFootwearArea) kidsFootwearArea.classList.add("hidden");
    }
}

renderCollections();
