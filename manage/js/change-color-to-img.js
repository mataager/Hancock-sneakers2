//main working
// function setupImageUpload(newInputSet, count) {
//   const changeCribButton = newInputSet.querySelector(`#change-ctib-${count}`);
//   const colorBgInput = newInputSet.querySelector(`#Colorbg${count}`);
//   const imageInput = newInputSet.querySelector(`#imageInput${count}`);

//   // Trigger file input when the "change-ctib" button is clicked
//   changeCribButton.addEventListener("click", function () {
//     imageInput.click(); // Programmatically trigger the file input
//   });

//   // Handle file selection
//   imageInput.addEventListener("change", function (event) {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = function (e) {
//         // Create a modal overlay for the image and circle
//         const modal = document.createElement("div");
//         modal.style.position = "fixed";
//         modal.style.top = "0";
//         modal.style.left = "0";
//         modal.style.width = "100%";
//         modal.style.height = "100%";
//         modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
//         modal.style.zIndex = "1000";
//         modal.style.display = "flex";
//         modal.style.justifyContent = "center";
//         modal.style.alignItems = "center";
//         document.body.appendChild(modal);

//         // Create an image container with scrolling
//         const imageContainer = document.createElement("div");
//         imageContainer.style.margin = "100px";
//         imageContainer.style.position = "relative";
//         modal.appendChild(imageContainer);

//         // Create an image element
//         const img = new Image();
//         img.src = e.target.result;
//         img.style.display = "block";
//         img.style.width = "100%"; // Ensure the image fits within the container
//         img.style.height = "auto"; // Maintain aspect ratio
//         img.style.filter = "brightness(0.5)"; // Reduce image brightness (fade effect)
//         imageContainer.appendChild(img);

//         // Create a fixed circle overlay
//         const circleOverlay = document.createElement("div");
//         let circleWidth = 105; // Initial circle diameter
//         circleOverlay.style.position = "absolute";
//         circleOverlay.style.width = `${circleWidth}px`; // Circle diameter
//         circleOverlay.style.height = `${circleWidth}px`; // Circle diameter
//         circleOverlay.style.border = "5px solid rgba(0, 0, 0, 0.3)";
//         circleOverlay.style.borderRadius = "50%";
//         circleOverlay.style.pointerEvents = "none"; // Allow clicks to pass through
//         circleOverlay.style.transform = "translate(-50%, -50%)";
//         circleOverlay.style.left = "50%";
//         circleOverlay.style.top = "50%";
//         circleOverlay.style.zIndex = "2";
//         imageContainer.appendChild(circleOverlay);

//         // Create a mask for the image
//         const imageMask = document.createElement("div");
//         imageMask.style.position = "absolute";
//         imageMask.style.top = "0";
//         imageMask.style.left = "0";
//         imageMask.style.width = "100%";
//         imageMask.style.height = "100%";
//         imageMask.style.backgroundColor = "rgba(0, 0, 0, 0.5)"; // Semi-transparent overlay
//         imageMask.style.zIndex = "1";
//         imageMask.style.clipPath = `circle(${circleWidth / 2}px at 50% 50%)`; // Initial clip path (half of circleWidth)
//         imageContainer.appendChild(imageMask);

//         // Variables to track circle position
//         let isDragging = false;

//         // Function to update circle and mask position
//         const updateCirclePosition = (x, y) => {
//           const containerRect = imageContainer.getBoundingClientRect();
//           const circleX = x - containerRect.left;
//           const circleY = y - containerRect.top;

//           // Update circle position
//           circleOverlay.style.left = `${circleX}px`;
//           circleOverlay.style.top = `${circleY}px`;

//           // Update mask clip path
//           imageMask.style.clipPath = `circle(${
//             circleWidth / 2
//           }px at ${circleX}px ${circleY}px)`;
//         };

//         // Mouse events for desktop
//         imageContainer.addEventListener("mousedown", (e) => {
//           isDragging = true;
//           updateCirclePosition(e.clientX, e.clientY);
//         });

//         imageContainer.addEventListener("mousemove", (e) => {
//           if (isDragging) {
//             updateCirclePosition(e.clientX, e.clientY);
//           }
//         });

//         imageContainer.addEventListener("mouseup", () => {
//           isDragging = false;
//         });

//         imageContainer.addEventListener("mouseleave", () => {
//           isDragging = false;
//         });

//         // Touch events for mobile
//         imageContainer.addEventListener("touchstart", (e) => {
//           isDragging = true;
//           const touch = e.touches[0];
//           updateCirclePosition(touch.clientX, touch.clientY);
//         });

//         imageContainer.addEventListener("touchmove", (e) => {
//           if (isDragging) {
//             const touch = e.touches[0];
//             updateCirclePosition(touch.clientX, touch.clientY);
//           }
//         });

//         imageContainer.addEventListener("touchend", () => {
//           isDragging = false;
//         });

//         // Add a button to confirm the selection
//         const confirmButton = document.createElement("button");
//         confirmButton.textContent = "Confirm Selection";
//         confirmButton.style.position = "fixed";
//         confirmButton.style.bottom = "20px";
//         confirmButton.style.left = "50%";
//         confirmButton.style.transform = "translateX(-50%)";
//         confirmButton.style.zIndex = "1001";
//         confirmButton.style.padding = "10px 20px";
//         confirmButton.style.backgroundColor = "#007bff";
//         confirmButton.style.color = "#fff";
//         confirmButton.style.border = "none";
//         confirmButton.style.borderRadius = "5px";
//         confirmButton.style.cursor = "pointer";
//         modal.appendChild(confirmButton);

//         // Add a close button to exit without confirming
//         const closeButton = document.createElement("button");
//         closeButton.textContent = "Close";
//         closeButton.style.position = "fixed";
//         closeButton.style.top = "20px";
//         closeButton.style.right = "20px";
//         closeButton.style.zIndex = "1001";
//         closeButton.style.padding = "10px 20px";
//         closeButton.style.backgroundColor = "#dc3545";
//         closeButton.style.color = "#fff";
//         closeButton.style.border = "none";
//         closeButton.style.borderRadius = "5px";
//         closeButton.style.cursor = "pointer";
//         modal.appendChild(closeButton);

//         // Handle close button click
//         closeButton.addEventListener("click", function () {
//           document.body.removeChild(modal);
//         });

//         // Add a slider to adjust the circle width
//         const circleWidthSlider = document.createElement("input");
//         circleWidthSlider.type = "range";
//         circleWidthSlider.min = "20";
//         circleWidthSlider.max = "200";
//         circleWidthSlider.value = circleWidth;
//         circleWidthSlider.style.position = "fixed";
//         circleWidthSlider.style.cursor = "pointer";
//         circleWidthSlider.style.bottom = "80px";
//         circleWidthSlider.style.left = "50%";
//         circleWidthSlider.style.transform = "translateX(-50%)";
//         circleWidthSlider.style.zIndex = "1001";
//         circleWidthSlider.style.width = "200px";
//         modal.appendChild(circleWidthSlider);

//         // Handle circle width adjustment
//         circleWidthSlider.addEventListener("input", function () {
//           circleWidth = parseInt(circleWidthSlider.value);
//           circleOverlay.style.width = `${circleWidth}px`;
//           circleOverlay.style.height = `${circleWidth}px`;
//           imageMask.style.clipPath = `circle(${circleWidth / 2}px at ${
//             circleOverlay.style.left
//           } ${circleOverlay.style.top})`;
//         });

//         // Handle confirm button click
//         confirmButton.addEventListener("click", function () {
//           // Calculate the position of the circle relative to the image
//           const imgRect = img.getBoundingClientRect();
//           const circleRect = circleOverlay.getBoundingClientRect();

//           // Calculate the scaling factor between the displayed image and the actual image
//           const scaleX = img.naturalWidth / imgRect.width;
//           const scaleY = img.naturalHeight / imgRect.height;

//           // Calculate the center of the circle relative to the actual image
//           const circleCenterX =
//             (circleRect.left - imgRect.left + circleRect.width / 2) * scaleX;
//           const circleCenterY =
//             (circleRect.top - imgRect.top + circleRect.height / 2) * scaleY;
//           const circleRadius = (circleRect.width / 2) * scaleX;

//           // Create a canvas to crop the image
//           const canvas = document.createElement("canvas");
//           canvas.width = 2 * circleRadius;
//           canvas.height = 2 * circleRadius;
//           const ctx = canvas.getContext("2d");

//           // Draw the cropped area
//           ctx.drawImage(
//             img,
//             circleCenterX - circleRadius,
//             circleCenterY - circleRadius,
//             2 * circleRadius,
//             2 * circleRadius,
//             0,
//             0,
//             2 * circleRadius,
//             2 * circleRadius
//           );

//           // Convert the cropped canvas to a data URL
//           const croppedImage = canvas.toDataURL("image/png");

//           // Remove the modal from the DOM
//           document.body.removeChild(modal);

//           // Set the cropped image as the background of the text input (Colorbg)
//           colorBgInput.style.backgroundImage = `url(${croppedImage})`;
//           colorBgInput.style.backgroundSize = "cover";
//           colorBgInput.style.backgroundPosition = "center";
//           colorBgInput.style.backgroundColor = "transparent";
//           colorBgInput.style.zIndex = "2";

//           // Change the button text to "Save"
//           changeCribButton.innerHTML = `<i class="bi bi-cloud-upload"></i>`;

//           // Upload the cropped image
//           uploadImageToImgur(croppedImage, function (response) {
//             if (response && response.data && response.data.link) {
//               alert("Image uploaded successfully: " + response.data.link);
//               // You can now use the link as needed
//             } else {
//               alert("Failed to upload image.");
//             }
//           });
//         });
//       };
//       reader.readAsDataURL(file);
//     }
//   });
// }

// Function to upload image to Imgur

//test
function setupImageUpload(newInputSet, count) {
  const changeCribButton = newInputSet.querySelector(`#change-ctib-${count}`);
  const colorBgInput = newInputSet.querySelector(`#Colorbg${count}`);
  const imageInput = newInputSet.querySelector(`#imageInput${count}`);

  // Trigger file input when the "change-ctib" button is clicked
  changeCribButton.addEventListener("click", function () {
    imageInput.click(); // Programmatically trigger the file input
  });

  // Handle file selection
  imageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        // Create a modal overlay for the image and circle
        const modal = document.createElement("div");
        modal.style.position = "fixed";
        modal.style.top = "0";
        modal.style.left = "0";
        modal.style.width = "100%";
        modal.style.height = "100%";
        modal.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        modal.style.zIndex = "1000";
        modal.style.display = "flex";
        modal.style.justifyContent = "center";
        modal.style.alignItems = "center";
        document.body.appendChild(modal);

        // Create an image container with scrolling
        const imageContainer = document.createElement("div");
        imageContainer.style.position = "relative";
        imageContainer.style.maxWidth = "90%";
        imageContainer.style.maxHeight = "90%";
        imageContainer.style.overflow = "auto";
        modal.appendChild(imageContainer);

        // Create an image element
        const img = new Image();
        img.src = e.target.result;
        img.style.display = "block";
        img.style.maxWidth = "300px";
        img.style.maxHeight = "500px";
        img.style.borderRadius = "10px";
        img.style.margin = "auto"; // Center the image
        img.style.filter = "brightness(0.8)"; // Reduce image brightness (fade effect)
        imageContainer.appendChild(img);

        // Create a fixed circle overlay
        const circleOverlay = document.createElement("div");
        let circleWidth = 105; // Initial circle diameter
        circleOverlay.style.position = "absolute";
        circleOverlay.style.width = `${circleWidth}px`;
        circleOverlay.style.height = `${circleWidth}px`;
        circleOverlay.style.border = "2px solid rgba(0, 0, 0, 0.3)";
        circleOverlay.style.borderRadius = "50%";
        circleOverlay.style.pointerEvents = "none"; // Allow clicks to pass through
        circleOverlay.style.transform = "translate(-50%, -50%)";
        circleOverlay.style.left = "50%";
        circleOverlay.style.top = "50%";
        circleOverlay.style.zIndex = "2";
        imageContainer.appendChild(circleOverlay);

        // Create a mask for the image
        const imageMask = document.createElement("div");
        imageMask.style.position = "absolute";
        imageMask.style.top = "0";
        imageMask.style.left = "0";
        imageMask.style.width = "100%";
        imageMask.style.height = "100%";
        imageMask.style.backgroundColor = "rgb(0 0 0 / 18%)"; // Semi-transparent overlay
        imageMask.style.zIndex = "1";
        imageMask.style.clipPath = `circle(${circleWidth / 2}px at 50% 50%)`; // Initial clip path
        imageContainer.appendChild(imageMask);

        // Variables to track circle position
        let isDragging = false;

        // Function to update circle and mask position
        const updateCirclePosition = (x, y) => {
          const containerRect = imageContainer.getBoundingClientRect();
          const circleX = x - containerRect.left;
          const circleY = y - containerRect.top;

          // Ensure the circle stays within the image container bounds
          const boundedX = Math.max(
            circleWidth / 2,
            Math.min(circleX, containerRect.width - circleWidth / 2)
          );
          const boundedY = Math.max(
            circleWidth / 2,
            Math.min(circleY, containerRect.height - circleWidth / 2)
          );

          // Update circle position
          circleOverlay.style.left = `${boundedX}px`;
          circleOverlay.style.top = `${boundedY}px`;

          // Update mask clip path
          imageMask.style.clipPath = `circle(${
            circleWidth / 2
          }px at ${boundedX}px ${boundedY}px)`;
        };

        // Mouse events for desktop
        imageContainer.addEventListener("mousedown", (e) => {
          isDragging = true;
          updateCirclePosition(e.clientX, e.clientY);
        });

        imageContainer.addEventListener("mousemove", (e) => {
          if (isDragging) {
            updateCirclePosition(e.clientX, e.clientY);
          }
        });

        imageContainer.addEventListener("mouseup", () => {
          isDragging = false;
        });

        imageContainer.addEventListener("mouseleave", () => {
          isDragging = false;
        });

        // Touch events for mobile
        imageContainer.addEventListener("touchstart", (e) => {
          isDragging = true;
          const touch = e.touches[0];
          updateCirclePosition(touch.clientX, touch.clientY);
        });

        imageContainer.addEventListener("touchmove", (e) => {
          if (isDragging) {
            const touch = e.touches[0];
            updateCirclePosition(touch.clientX, touch.clientY);
          }
        });

        imageContainer.addEventListener("touchend", () => {
          isDragging = false;
        });

        // Add a button to confirm the selection
        const confirmButton = document.createElement("button");
        confirmButton.textContent = "Confirm Selection";
        confirmButton.classList.add("ConfirmSelectionimg");
        modal.appendChild(confirmButton);

        // Add a close button to exit without confirming
        const closeButton = document.createElement("button");
        closeButton.textContent = "Close";
        closeButton.classList.add("closeimgselection");
        modal.appendChild(closeButton);

        // Handle close button click
        closeButton.addEventListener("click", function () {
          document.body.removeChild(modal);
        });

        // Add a slider to adjust the circle width
        const circleWidthSlider = document.createElement("input");
        circleWidthSlider.type = "range";
        circleWidthSlider.min = "20";
        circleWidthSlider.max = "200";
        circleWidthSlider.value = circleWidth;
        circleWidthSlider.style.position = "fixed";
        circleWidthSlider.style.bottom = "80px";
        circleWidthSlider.style.left = "50%";
        circleWidthSlider.style.transform = "translateX(-50%)";
        circleWidthSlider.style.zIndex = "1001";
        circleWidthSlider.style.width = "200px";
        circleWidthSlider.style.cursor = "pointer";
        modal.appendChild(circleWidthSlider);

        // Handle circle width adjustment
        circleWidthSlider.addEventListener("input", function () {
          circleWidth = parseInt(circleWidthSlider.value);
          circleOverlay.style.width = `${circleWidth}px`;
          circleOverlay.style.height = `${circleWidth}px`;
          imageMask.style.clipPath = `circle(${circleWidth / 2}px at ${
            circleOverlay.style.left
          } ${circleOverlay.style.top})`;
        });

        // Handle confirm button click
        confirmButton.addEventListener("click", function () {
          // Calculate the position of the circle relative to the image
          const imgRect = img.getBoundingClientRect();
          const circleRect = circleOverlay.getBoundingClientRect();

          // Calculate the scaling factor between the displayed image and the actual image
          const scaleX = img.naturalWidth / imgRect.width;
          const scaleY = img.naturalHeight / imgRect.height;

          // Calculate the center of the circle relative to the actual image
          const circleCenterX =
            (circleRect.left - imgRect.left + circleRect.width / 2) * scaleX;
          const circleCenterY =
            (circleRect.top - imgRect.top + circleRect.height / 2) * scaleY;
          const circleRadius = (circleRect.width / 2) * scaleX;

          // Create a canvas to crop the image
          const canvas = document.createElement("canvas");
          canvas.width = 2 * circleRadius;
          canvas.height = 2 * circleRadius;
          const ctx = canvas.getContext("2d");

          // Draw the cropped area
          ctx.drawImage(
            img,
            circleCenterX - circleRadius,
            circleCenterY - circleRadius,
            2 * circleRadius,
            2 * circleRadius,
            0,
            0,
            2 * circleRadius,
            2 * circleRadius
          );

          // Convert the cropped canvas to a data URL
          const croppedImage = canvas.toDataURL("image/png");

          // Remove the modal from the DOM
          document.body.removeChild(modal);

          // Set the cropped image as the background of the text input (Colorbg)
          colorBgInput.style.backgroundImage = `url(${croppedImage})`;
          colorBgInput.style.backgroundSize = "cover";
          colorBgInput.style.backgroundPosition = "center";
          colorBgInput.style.backgroundColor = "transparent";
          colorBgInput.style.zIndex = "2";

          // // Create a new button for re-choosing another image
          // const reChooseButton = document.createElement("button");
          // reChooseButton.textContent = "Re-choose Image";
          // reChooseButton.style.position = "absolute";
          // reChooseButton.style.top = "15px";
          // reChooseButton.style.left = "-8px";
          // reChooseButton.style.zIndex = "1001";
          // reChooseButton.style.padding = "5px 10px";
          // reChooseButton.style.backgroundColor = "#28a745";
          // reChooseButton.style.color = "#fff";
          // reChooseButton.style.border = "none";
          // reChooseButton.style.borderRadius = "5px";
          // reChooseButton.style.cursor = "pointer";
          // newInputSet.appendChild(reChooseButton);

          // // Handle re-choose button click
          // reChooseButton.addEventListener("click", function () {
          //   imageInput.click(); // Trigger file input to choose another image
          // });

          // Upload the cropped image
          uploadImageToImgur(croppedImage, function (response) {
            if (response && response.data && response.data.link) {
              alert("Image uploaded successfully: " + response.data.link);
              // You can now use the link as needed
            } else {
              alert("Failed to upload image.");
            }
          });
        });
      };
      reader.readAsDataURL(file);
    }
  });
}

function uploadImageToImgur(imageData, callback) {
  // const formData = new FormData();
  // formData.append("image", imageData.split(",")[1]);
  // fetch("https://api.imgur.com/3/image", {
  //   method: "POST",
  //   headers: {
  //     Authorization: "Client-ID YOUR_CLIENT_ID", // Replace with your Imgur client ID
  //   },
  //   body: formData,
  // })
  //   .then((response) => response.json())
  //   .then((data) => callback(data))
  //   .catch((error) => console.error("Error:", error));
}
