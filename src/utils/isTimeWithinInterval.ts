/**
 * Checks if the specified time is within the given interval.
 * @param {Date} timeToCheck - The time to be checked for its presence within the interval.
 * @param {Object} interval - An object containing the start and end time of the interval.
 * @param {Date} interval.start - The start time of the interval.
 * @param {Date} interval.end - The end time of the interval.
 * @returns {boolean} - Returns true if the time TO check is within the interval, otherwise false.
 */
export default function isTimeWithinInterval(
  timeToCheck: Date,
  { start, end }: { start: Date; end: Date }
): boolean {
  try {
    // If the sleep end time is earlier than the start time, it's on the next day
    if (end < start) {
      end.setDate(end.getDate() + 1);
    }

    // Check if the time to check is within the interval
    return timeToCheck >= start && timeToCheck < end;
  } catch (error) {
    console.error((error as Error).message);
    return false;
  }
}
