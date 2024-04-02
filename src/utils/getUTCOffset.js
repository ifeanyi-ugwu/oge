/**
 * Gets the UTC offset for a timeZone
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {string} - Returns a string representing the UTC offset (eg., "-05:00").
 */

export default function getUTCOffset(timeZone) {
  try {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(
      date.toLocaleString("en-US", { timeZone: timeZone })
    );
    let offset = (tzDate - utcDate) / (1000 * 60 * 60);
    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.floor((Math.abs(offset) * 60) % 60);
    return (
      (offset < 0 ? "-" : "+") +
      String(hours).padStart(2, "0") +
      ":" +
      String(minutes).padStart(2, "0")
    );
  } catch (error) {
    console.error(error.message);
  }
}

// console.log(getUTCOffset("America/New_York"));
// console.log(getUTCOffset("Africa/Lagos"));
// console.log(getUTCOffset("Asia/Kolkata"));
