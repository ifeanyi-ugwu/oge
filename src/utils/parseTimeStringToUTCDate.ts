import getUTCOffset from "./getUTCOffset.js";

/**
 * Parses a time string to a UTC date object.
 * @param {string} timeString - The time string to parse (in format "HH:MM").
 * @param {string} timeZone - The standard time zone (e.g., "America/New_York").
 * @returns {Date | undefined} - Returns a Date object representing the parsed time in UTC, or undefined if an error occurs.
 */
export default function parseTimeStringToUTCDate(
  timeString: string,
  timeZone: string
): Date | undefined {
  try {
    const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = timeString
      .split(":")
      .map(Number);

    const now = new Date();
    // Create a date object for the current date in UTC
    const date = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        hours,
        minutes,
        seconds,
        milliseconds
      )
    );

    const offset = getUTCOffset(timeZone);

    if (offset != undefined) {
      // Calculate the offset in milliseconds
      const [offsetHours, offsetMinutes] = offset.split(":").map(Number);
      const offsetMilliseconds =
        (offsetHours * 60 + offsetMinutes) *
        60 *
        1000 *
        (offset.startsWith("-") ? -1 : 1);

      const dateInTimeZone = new Date(date.getTime() + offsetMilliseconds);

      return dateInTimeZone;
    }
  } catch (error) {
    console.error((error as Error).message);
  }
}

/*function parseTimeStringToUTCDate(timeString, timeZone) {
  try {
    const [hours = 0, minutes = 0, seconds = 0, milliseconds = 0] = timeString
      .split(":")
      .map(Number);
    const date = new Date();
    date.setUTCHours(hours, minutes, seconds, milliseconds);
    console.log(date);
    return date;
  } catch (error) {
    console.error(error.message);
  }
}*/
