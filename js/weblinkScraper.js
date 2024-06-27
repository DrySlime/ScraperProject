const reverseImageSearch = require('./reverseImageSearch');
const scrapingInfos = require('./scrapingInfos');
const titleSearch = require('./titleSearch')

async function weblinkScraper(weblink){
    let result = []
    try {
        //check if link is valid
        //TODO validate Link;

        // Scrape for weblink data
        const { title, price, images } = await scrapingInfos(weblink);
        console.log(title,price,images);   
        //do a google image search
        const imgSearchResult = await reverseImageSearch(images)
        const titleSearchResult = await titleSearch(title)

        //TODO combine results and return them
        result = result.concat(imgSearchResult, titleSearchResult);
        console.log("done: ", result)
        return result
    } catch (error) {
        console.error(`Error fetching the webpage: ${error.message}`);
    }   
};

module.exports = weblinkScraper;