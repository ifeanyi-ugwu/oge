import {
  isTimeWithinInterval,
  parseTimeStringToUTCDate,
  pingUrl,
} from "./utils/index.js";

/**
 * Configures and starts the pinging process for the specified URL.
 * @param {Object} config - Configuration object.
 * @param {string} config.url - The URL to ping.
 * @param {number} [config.intervalMinutes=14] - The interval between pings (in minutes).
 * @param {string} [config.sleepStart] - The start time (based on the specified time zone OR UTC by default) of the sleep window in 24-hour format 'HH:MM:SS:MS' (e.g., "22:00:00:00").
 * @param {string} [config.sleepEnd] - The end time (based on the specified time zone OR UTC by default) of the sleep window in 24-hour format 'HH:MM:SS:MS' (e.g., "06:00:00:00").
 * @param {string} [config.timeZone="UTC"] - The standard time zone (e.g., "America/New_York").
 * @returns {Object} result - The result object
 * @returns {Function} result.start - The function to start the pinging process.
 * @returns {Function} result.stop - The function to stop the pinging process.
 */
export default function sleepGuard({
  url,
  intervalMinutes = 14,
  sleepStart,
  sleepEnd,
  timeZone = "UTC",
}: {
  url: URL;
  intervalMinutes?: number;
  sleepStart?: string;
  sleepEnd?: string;
  timeZone?: string;
}): object {
  let intervalId: number | undefined;
  let sleepTimeoutId: number | undefined;

  let sleepStartTimeUTC: Date | undefined, sleepEndTimeUTC: Date | undefined;

  /**
   * Stops the pinging process.
   */
  function stop() {
    console.log("Stopping Sleep Guard...");
    clearInterval(intervalId);
    clearTimeout(sleepTimeoutId);

    console.log("Sleep Guard has been Stopped.");
  }

  /**
   * Starts the pinging process.
   */
  function start() {
    // Get the current time in the specified timezone as a string
    const currentTimeString = new Date().toLocaleTimeString("en-US", {
      timeZone,
      hour12: false,
    });

    const currentTimeUTC = parseTimeStringToUTCDate(
      currentTimeString,
      timeZone
    );

    // If sleep window provided and current time is in sleep window
    if (
      sleepStartTimeUTC &&
      sleepEndTimeUTC &&
      currentTimeUTC &&
      isTimeWithinInterval(currentTimeUTC, {
        start: sleepStartTimeUTC,
        end: sleepEndTimeUTC,
      })
    ) {
      console.log(`\n--- Sleep Mode Activated ---`);
      console.log(`Current Time: ${currentTimeString} (${timeZone} time)`);
      console.log(`Resuming at: ${sleepEnd} (${timeZone} time)`);
      console.log(`-------------------------------\n`);

      stop();

      // Calculate the timeout duration based on the remaining time before the end of the sleep window
      const timeoutDuration =
        sleepEndTimeUTC.getTime() - currentTimeUTC.getTime();

      sleepTimeoutId = setTimeout(start, timeoutDuration);
    } else {
      console.log(`\n--- Ping Sent ---`);
      console.log(`Current Time: ${currentTimeString} (${timeZone} time)`);
      console.log(`Next Ping in: ${intervalMinutes} minute(s)`);
      console.log(`------------------\n`);

      pingUrl(url);

      // Set up the interval if it's not already running
      if (!intervalId) {
        intervalId = setInterval(start, 60 * 1000 * intervalMinutes);
      }
    }
  }

  // Initialize sleepStartTimeUTC and sleepEndTimeUTC if sleep configuration is provided
  if (sleepStart && sleepEnd && timeZone) {
    sleepStartTimeUTC = parseTimeStringToUTCDate(sleepStart, timeZone);
    sleepEndTimeUTC = parseTimeStringToUTCDate(sleepEnd, timeZone);
  }

  console.log(`\n--- Pinger Configuration ---`);
  console.log(`URL: ${url}`);
  console.log(`Ping Interval: ${intervalMinutes} minute(s)`);
  if (sleepStart && sleepEnd && timeZone) {
    console.log(`Sleep Window: ${sleepStart} - ${sleepEnd} (${timeZone} time)`);
  }
  console.log(`-------------------------------\n`);

  return { start, stop };
}
