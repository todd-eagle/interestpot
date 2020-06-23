const axios = require("axios");
const cheerio = require('cheerio');

const travelScraper = async (req, res) => {
  const html = await axios.get('https://screenrant.com/movie-news/')
     const $ = cheerio.load(html.data)

    //TRAVEL
   // lonelyplanet
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
    
    //MOVIES

    //Screenrant
    data = {
        title: $('article').find('a.bc-title-link').attr('title'),
        image: $('article > a >div > div > picture').html(),
        link:  $('article').find('.bc-img-link').attr('href')
    }
    
    
    res.status(200).send(data)   
}

exports.travelScraper = travelScraper