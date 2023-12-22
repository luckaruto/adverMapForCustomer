export function formatDate(dateTimeString) {
  // Parse the input string to create a Date object
  const dateTime = new Date(dateTimeString);

  // Check if the date is valid
  if (isNaN(dateTime.getTime())) {
    return "Invalid Date";
  }

  // Format the date for UI (e.g., "Dec 22, 2023 22:14:14")
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const formattedDate = dateTime.toLocaleString("en-US", options);

  return formattedDate;
}
