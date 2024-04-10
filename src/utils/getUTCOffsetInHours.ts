/**
 * Gets the UTC offset for a timeZone in hours
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {number | undefined} - Returns a number representing the UTC offset (eg., -5), or undefined if an error occurs.
 */
export default function getUTCOffsetInHours(
  timeZone: string
): number | undefined {
  try {
    const date = new Date();
    const utcDate = new Date(
      date.toLocaleString("en-US", { timeZone: "UTC" })
    ).getTime();
    const tzDate = new Date(
      date.toLocaleString("en-US", { timeZone: timeZone })
    ).getTime();
    const offset = (tzDate - utcDate) / (1000 * 60 * 60);

    return offset;
  } catch (error) {
    console.error((error as Error).message);
  }
}
