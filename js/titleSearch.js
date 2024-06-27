const axios = require('axios');

// Replace with your API key and CSE ID
const GOOGLE_API_KEY = 'AIzaSyBP2NycKQD4-hUmehS0O4BJvHF7C5NCwYk';
const CX = '005897dca05ad4fd8';

async function titleSearch(query) {
  const results = new Set(); // Use a Set to store unique results
  const allowedDomains = [
    'amazon.de', 'otto.de', 'zalando.de', 'mediamarkt.de', 'notebooksbilliger.de',
    'cyberport.de', 'saturn.de', 'alternate.de', 'idealo.de', 'thalia.de',
    'reichelt.de', 'conrad.de', 'expert.de', 'buecher.de', 'real.de',
    'tchibo.de', 'lidl.de', 'aldi.de', 'baur.de', 'medpex.de',
    'apodiscounter.de', 'douglas.de', 'flaconi.de', 'parfumdreams.de', 'rossmann.de',
    'dm.de', 'mytoys.de', 'babywalz.de', 'windeln.de', 'hse24.de'
  ];

  const endpoint = 'https://www.googleapis.com/customsearch/v1';

  try {
    let nextPageToken = null;
    let retries = 0;
    const maxRetries = 5;

    do {
      const params = {
        key: GOOGLE_API_KEY,
        cx: CX,
        q: query,
        num: 10, // Retrieve 10 results at a time (maximum allowed per request)
      };
      if (nextPageToken) {
        params.start = nextPageToken;
      }

      try {
        const response = await axios.get(endpoint, {
          params,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          }
        });

        const items = response.data.items || [];
        items.forEach(item => {
          const url = new URL(item.link);
          if (allowedDomains.some(domain => url.hostname.endsWith(domain))) {
            results.add(item.link);
          }
        });

        nextPageToken = response.data.queries.nextPage ? response.data.queries.nextPage[0].startIndex : null;
        retries = 0; // Reset retries on successful request
      } catch (error) {
        if (error.response && error.response.status === 403) {
          // Ignore 403 errors specifically
          console.warn('Warning: Received status code 403, ignoring and continuing.');
          break;
        } else if (error.response && error.response.data.error.code === 429) {
          // Handle quota exceeded errors with exponential backoff
          retries++;
          if (retries > maxRetries) {
            console.error('Max retries exceeded, stopping.');
            break;
          }
          const delay = Math.pow(2, retries) * 1000;
          console.warn(`Quota exceeded, retrying in ${delay / 1000} seconds...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          console.error('Error performing search:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
          return [];
        }
      }
    } while (results.size < 30 && nextPageToken);

  } catch (error) {
    console.error('Unexpected error:', error);
    return [];
  }

  return Array.from(results).slice(0, 30); // Convert Set to Array and return only the top 30 unique results
}
module.exports = titleSearch;