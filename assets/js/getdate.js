const now = new Date();

const day = now.getDate();
const month = now.getMonth() + 1; // Months are zero-based, so add 1
const year = now.getFullYear();

let hours = now.getHours();
const minutes = now.getMinutes();
const ampm = hours >= 12 ? "pm" : "am";

// Convert hours to 12-hour format
hours = hours % 12;
hours = hours ? hours : 12; // Handle midnight (0 hours)

const formattedDate = `${day}/${month}/${year}-${hours}:${minutes
  .toString()
  .padStart(2, "0")} ${ampm}`;
