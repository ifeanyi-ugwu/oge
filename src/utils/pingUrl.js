/**
 * Pings a url by sending a fetch request
 * @param {string} url - The url to send the ping request (e.g., "https://google.com").
 */
export default async function pingUrl(url) {
  try {
    const response = await fetch(url, { timeout: 5000 }); // 5 seconds

    if (response.ok) {
      console.log(
        `Status: ${response.status} | Fetching ${url}. Server is awake.`
      );
    } else {
      console.log(
        `Status: ${response.status} | Fetching ${url}. Server returned an error.`
      );
      console.error(response);
    }
  } catch (error) {
    console.error(`Error fetching ${url}: ${error.message}`);
  }
}
