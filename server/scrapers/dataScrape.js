const axios = require("axios");
const cheerio = require('cheerio');


const  scrape = async (url) => {
    const html = await axios.get(url)
    const $ = cheerio.load(html.data)
    
    data = {
        title: $('.article-card').find('header > h3 > a').html(),
        img: $('.article-card__image').find('a > img').attr('src'),
        link:  $('.article-card').find('header > h3 > a').attr('href')
    }

    return data
}

exports.scrape=scrape