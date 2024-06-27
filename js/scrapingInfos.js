const cheerio = require('cheerio');
const axios = require('axios');
const getDomainName = require('./getDomainName');

async function scrapingInfos(weblink) {
    let title = '';
    let price = '';
    const images = [];
    const domainName = getDomainName(weblink);

    try {
        const response = await axios.get(weblink);
        console.log('Fetching data...');

        const html = response.data;
        const $ = cheerio.load(html);

        switch (domainName) {
            case 'amazon.de':
                title = $('div[id="titleSection"] > h1 > span[id="productTitle"]').text().trim();
                price = $('div[id="corePrice_feature_div"]').find('span.a-offscreen').text();
                let priceMatch = price.match(/\d+([.,]\d+)?/);

                if (priceMatch) {
                    price = priceMatch[0];
                } else {
                    console.log('Kein Preis gefunden');
                }

                $('div[id="main-image-container"]').find('img').each((index, element) => {
                    const imgUrl = $(element).attr('src');
                    if (imgUrl) {
                        images.push(imgUrl);
                    }
                });
                $('div[id="altImages"]').find('img').each((index, element) => {
                    const imgUrl = $(element).attr('src');
                    if (imgUrl) {
                        images.push(imgUrl);
                    }
                });
                break;

            case 'ebay.de':
                title = $("h1[class='x-item-title__mainTitle'] span[class='ux-textspans ux-textspans--BOLD']").text();
                price = $("div[class='x-price-primary'] span[class='ux-textspans']").text();
                images.push($(".img-scale-down[loading='eager']").attr('src'));
                break;

            default:
                console.log('Unsupported domain');
                break;
        }

        return { title, price, images };
    } catch (error) {
        console.error('Error fetching the webpage:', error);
        return { title: '', price: '', images: [] };
    }
}

module.exports = scrapingInfos;
