// Function to set default image source if the image source is null or empty for product photos 1 to 6
function setDefaultImageSource(product) {
  const defaultSrc =
    "https://i.imgur.com/gLKw3OD_d.webp?maxwidth=760&fidelity=grand";

  // Check and assign default source for each product photo manually
  if (
    !product["product-photo"] ||
    product["product-photo"].trim() === "" ||
    product["product-photo"] === "undefined"
  ) {
    product["product-photo"] = defaultSrc;
  }

  if (
    !product["product-photo2"] ||
    product["product-photo2"].trim() === "" ||
    product["product-photo2"] === "undefined"
  ) {
    product["product-photo2"] = defaultSrc;
  }

  if (
    !product["product-photo3"] ||
    product["product-photo3"].trim() === "" ||
    product["product-photo3"] === "undefined"
  ) {
    product["product-photo3"] = defaultSrc;
  }

  if (
    !product["product-photo4"] ||
    product["product-photo4"].trim() === "" ||
    product["product-photo4"] === "undefined"
  ) {
    product["product-photo4"] = defaultSrc;
  }

  if (
    !product["product-photo5"] ||
    product["product-photo5"].trim() === "" ||
    product["product-photo5"] === "undefined"
  ) {
    product["product-photo5"] = defaultSrc;
  }

  if (
    !product["product-photo6"] ||
    product["product-photo6"].trim() === "" ||
    product["product-photo6"] === "undefined"
  ) {
    product["product-photo6"] = defaultSrc;
  }
}

// Function to set default image source for img1 to img6 manually in product details
function setDefaultImageSource_PD(
  product,
  img1Key,
  img2Key,
  img3Key,
  img4Key,
  img5Key,
  img6Key
) {
  const defaultSrc =
    "https://i.imgur.com/gLKw3OD_d.webp?maxwidth=760&fidelity=grand";

  // Check and assign default source for each img key manually
  if (
    !product[img1Key] ||
    product[img1Key].trim() === "" ||
    product[img1Key] === "undefined"
  ) {
    product[img1Key] = defaultSrc;
  }

  if (
    !product[img2Key] ||
    product[img2Key].trim() === "" ||
    product[img2Key] === "undefined"
  ) {
    product[img2Key] = defaultSrc;
  }

  if (
    !product[img3Key] ||
    product[img3Key].trim() === "" ||
    product[img3Key] === "undefined"
  ) {
    product[img3Key] = defaultSrc;
  }

  if (
    !product[img4Key] ||
    product[img4Key].trim() === "" ||
    product[img4Key] === "undefined"
  ) {
    product[img4Key] = defaultSrc;
  }

  if (
    !product[img5Key] ||
    product[img5Key].trim() === "" ||
    product[img5Key] === "undefined"
  ) {
    product[img5Key] = defaultSrc;
  }

  if (
    !product[img6Key] ||
    product[img6Key].trim() === "" ||
    product[img6Key] === "undefined"
  ) {
    product[img6Key] = defaultSrc;
  }
}
