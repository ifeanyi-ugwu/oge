/**
 * Pings a url by sending a fetch request
 * @param {string} url - The url to send the ping request (e.g., "https://google.com").
 */
export default async function pingUrl(url: URL) {
  try {
    const response = await fetch(url);

    if (response.ok) {
      console.log(
        `Status: ${response.status} | Fetching ${url}. Server is awake.`
      );
    } else {
      console.log(
        `Status: ${response.status} | Fetching ${url}. Server returned an error: ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(`Error fetching ${url}: ${(error as Error).message}`);
  }
}
