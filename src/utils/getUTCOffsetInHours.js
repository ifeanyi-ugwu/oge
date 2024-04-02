/**
 * Gets the UTC offset for a timeZone in hours
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {Number} - Returns a number representing the UTC offset (eg., -5).
 */
export default function getUTCOffsetInHours(timeZone) {
  try {
    const date = new Date();
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const tzDate = new Date(
      date.toLocaleString("en-US", { timeZone: timeZone })
    );
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);

    return offset;
  } catch (error) {
    console.error(error.message);
  }
}
