// uploadToCloudinary
const uploadPreset = "Hancock"; // Replace with your unsigned upload preset name
const cloudName = "dzxs5xgfy"; // Replace with your Cloudinary cloud name
// async function uploadToCloudinary(file, uploadPreset, cloudName) {
//   if (!file) {
//     console.error("No file provided for upload");
//     return null;
//   }

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("upload_preset", uploadPreset);

//   console.log("Uploading to Cloudinary...");
//   for (let [key, value] of formData.entries()) {
//     console.log(`${key}: ${value}`);
//   }

//   const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       const errorDetails = await response.json();
//       console.error("Upload error details:", errorDetails);
//       throw new Error(
//         errorDetails.error.message ||
//           `Upload failed with status ${response.status}`
//       );
//     }

//     const data = await response.json();
//     console.log("Upload successful:", data);
//     return data.secure_url;
//   } catch (error) {
//     console.error("Error uploading image to Cloudinary:", error);
//     return null;
//   }
// }

//

//imgur upload

async function uploadToCloudinary(file, uploadPreset, cloudName) {
  if (!file) {
    console.error("No file provided for upload");
    return { success: false, data: { error: "No file provided for upload" } };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return {
        success: false,
        data: { error: errorDetails.error?.message || "Upload failed" },
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: { link: data.secure_url }, // Mimic Imgur's `link` field
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return {
      success: false,
      data: { error: error.message },
    };
  }
}
//
async function imgurUpload(clientId, formData) {
  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Return the result for further handling
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}

// Uncomment the function you want to use and comment out the other one

// Cloudinary upload function
/*
async function uploadImage(file, uploadPreset, cloudName) {
  if (!file) {
    console.error("No file provided for upload");
    return { success: false, data: { error: "No file provided for upload" } };
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      return {
        success: false,
        data: { error: errorDetails.error?.message || "Upload failed" },
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: { link: data.secure_url }, // Mimic Imgur's `link` field
    };
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return {
      success: false,
      data: { error: error.message },
    };
  }
}
*/

// Imgur upload function
/*
async function uploadImage(clientId, formData) {
  try {
    const response = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${clientId}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to upload image: ${response.statusText}`);
    }

    const result = await response.json();
    return result; // Return the result for further handling
  } catch (error) {
    console.error("Error uploading image to Imgur:", error);
    throw error; // Re-throw the error for the caller to handle
  }
}
*/
