/**
 * Gets the UTC offset for a timeZone
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {string | undefined} - Returns a string representing the UTC offset (eg., "-05:00"), or undefined if an error occurs.
 */

export default function getUTCOffset(timeZone: string): string | undefined {
  try {
    const date = new Date();
    const utcDate = new Date(
      date.toLocaleString("en-US", { timeZone: "UTC" })
    ).getTime();
    const tzDate = new Date(
      date.toLocaleString("en-US", { timeZone: timeZone })
    ).getTime();
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
    console.error((error as Error).message);
  }
}
