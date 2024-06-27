const vision = require('@google-cloud/vision');
const path = require('path');

// Creates a client
const client = new vision.ImageAnnotatorClient({
  keyFilename: path.join(__dirname, '..\\key\\webscraper-426117-5605651ae641.json'), // Replace with the path to your service account key file
});

async function reverseImageSearch(imageUrls) {
  const results = [];
  const allowedDomains = [
    'amazon.de', 'otto.de', 'zalando.de', 'mediamarkt.de', 'notebooksbilliger.de',
    'cyberport.de', 'saturn.de', 'alternate.de', 'idealo.de', 'thalia.de',
    'reichelt.de', 'conrad.de', 'expert.de', 'buecher.de', 'real.de',
    'tchibo.de', 'lidl.de', 'aldi.de', 'baur.de', 'medpex.de',
    'apodiscounter.de', 'douglas.de', 'flaconi.de', 'parfumdreams.de', 'rossmann.de',
    'dm.de', 'mytoys.de', 'babywalz.de', 'windeln.de', 'hse24.de'
  ];

  for (const imageUrl of imageUrls) {
    try {
      const [result] = await client.webDetection({ image: { source: { imageUri: imageUrl } } });
      const webDetection = result.webDetection;

      if (webDetection.pagesWithMatchingImages.length) {
        console.log(`Pages with matching images found: ${webDetection.pagesWithMatchingImages.length}`);
        webDetection.pagesWithMatchingImages.forEach(page => {
          // Check if the page URL is from an allowed domain
          const url = new URL(page.url);
          if (allowedDomains.some(domain => url.hostname.endsWith(domain))) {
            results.push(page.url);
          }
        });
      }
    } catch (error) {
      console.error('Error searching image:', error);
      return [];
    }
  }
  return results;
}

module.exports = reverseImageSearch;