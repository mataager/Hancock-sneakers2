async function fetchImageAsBase64(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Extract Base64 content
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

// Function to detect Arabic characters
function containsArabic(text) {
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
}

// Function to print order details to PDF
async function print(orderId) {
  try {
    // Fetch order details
    const response = await fetch(`${url}/Stores/${uid}/orders/${orderId}.json`);
    const order = await response.json();
    if (!order) {
      console.error("Order not found.");
      return;
    }

    // Initialize jsPDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.addFileToVFS("NotoSansArabic.ttf", window.arabicFontBase64);
    doc.addFont("NotoSansArabic.ttf", "NotoSansArabic", "normal");

    // Set font based on text content
    function setFontForText(text) {
      if (containsArabic(text)) {
        doc.setFont("NotoSansArabic");
      } else {
        doc.setFont("helvetica");
      }
    }

    // Add Order Details to PDF
    doc.setFontSize(16);

    const details = [
      `Order ID: ${orderId}`,
      `Customer Name: ${order.personal_info.name}`,
      `Email: ${order.personal_info.email}`,
      `City: ${order.personal_info.city}`,
      `Address: ${order.personal_info.address}`,
      `Phone 1: ${order.personal_info.phone}`,
      order.personal_info.phone2
        ? `Phone 2: ${order.personal_info.phone2}`
        : null,
      `Shipping Fees: ${order.shippingFees} EGP`,
      `Payment Type: ${order.payment}`,
    ].filter(Boolean);

    let yPosition = 10;
    for (const detail of details) {
      setFontForText(detail);
      doc.text(detail, 10, yPosition);
      yPosition += 10;
    }

    // Calculate total price
    const totalPrice =
      order.cart.reduce(
        (sum, item) =>
          sum + parseFloat(item.price.replace(" EGP", "")) * item.quantity,
        0
      ) + order.shippingFees;

    doc.text(`Total Price: ${totalPrice} EGP`, 10, yPosition);
    yPosition += 20;

    // Add Items to PDF
    doc.setFontSize(14);
    doc.text("Items:", 10, yPosition);
    yPosition += 10;

    const pageWidth = doc.internal.pageSize.getWidth();
    const imageWidth = 40;
    const imageHeight = 40;
    const padding = 10;

    for (const item of order.cart) {
      const itemText = `${item.title} - ${item.brand}, Size: ${item.productSize}, Color: ${item.productColor}, Qty: ${item.quantity}, Price: ${item.price}`;
      setFontForText(itemText);

      // Fetch and add image
      const imgBase64 = await fetchImageAsBase64(item.photourl);
      if (imgBase64) {
        doc.addImage(imgBase64, "JPEG", 10, yPosition, imageWidth, imageHeight);
        const xPosition = 10 + imageWidth + padding;
        const maxTextWidth = pageWidth - xPosition - padding;
        const wrappedText = doc.splitTextToSize(itemText, maxTextWidth);
        doc.text(wrappedText, xPosition, yPosition + 5);
        yPosition += imageHeight + padding + wrappedText.length * 5;
      } else {
        const maxTextWidth = pageWidth - padding * 2;
        const wrappedText = doc.splitTextToSize(itemText, maxTextWidth);
        doc.text(wrappedText, 10, yPosition);
        yPosition += wrappedText.length * 5 + padding;
      }

      // Add a new page if yPosition exceeds page height
      if (yPosition > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPosition = 20;
      }
    }

    // Save the PDF
    doc.save(`Order_${orderId}.pdf`);
  } catch (error) {
    console.error("Error printing order:", error);
  }
}
