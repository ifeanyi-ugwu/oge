/**
 * Gets the current time in the specified time zone
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {string | undefined} - Returns a string representing the current time in the time zone, or undefined if an error occurs.
 */

export default function getCurrentTimeInTimeZone(
  timeZone: string
): string | undefined {
  try {
    const date = new Date().toLocaleString("en-US", { timeZone: timeZone });
    return date;
  } catch (error) {
    console.error((error as Error).message);
  }
}
