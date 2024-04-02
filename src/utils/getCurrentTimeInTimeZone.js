/**
 * Gets the current time in the specified time zone
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {string} - Returns a string representing the current time in the time zone.
 */

export default function getCurrentTimeInTimeZone(timezone) {
  try {
    // Get the current time in the specified timezone
    return (date = new Date().toLocaleString("en-US", { timeZone: timezone }));
  } catch (error) {
    console.error(error.message);
  }
}
