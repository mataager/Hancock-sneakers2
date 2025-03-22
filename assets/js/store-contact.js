// Set the phone number and email in the respective span elements
document.getElementById("store-number").innerText = storePhoneNum;
document.getElementById("store-email").innerText = storeEmail;

// Set the href attributes for the call and mailto links
document
  .getElementById("store-call")
  .setAttribute("href", `tel:${storePhoneNum}`);
document
  .getElementById("store-email-link")
  .setAttribute("href", `mailto:${storeEmail}`);
