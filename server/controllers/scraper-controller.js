const axios = require("axios");
const cheerio = require('cheerio');

const travelScraper = async (req, res) => {
  const html = await axios.get('https://www.travelandleisure.com/travel-news')
     const $ = cheerio.load(html.data)

    
    //lonelyplanet
    //  data = {
    //     title: $('.ContentList').find('h3 > a').html(),
    //     image: $('.ContentList').find('.ListItemThumbnail > a > img').attr('src'),
    //     link: $('.ContentList').find('.ListItemThumbnail > a').attr('href')
    // }

    //travel and leisure
    // data = {
    //     title: $('.category-page-item-content').find('h3').html(),
    //     image: $('.category-page-item-image').find('div').attr('data-src'),
    //     link:  $('.category-page-item-content').find('a').attr('href')
    // }
    res.status(200).send(data)   
}

exports.travelScraper = travelScraper