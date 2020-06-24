const axios = require("axios");
const cheerio = require('cheerio');
const scrape =require('./dataScrape')

const travelScraper = async (req, res) => {
    // const html = await axios.get('https://suitcasemag.com/')
    // const $ = cheerio.load(html.data)
    req.body = {url: 'https://suitcasemag.com/'}
    const {url} = req.body

    const data = await(scrape.scrape(url))

    
    res.status(200).send(data)   
}

exports.travelScraper = travelScraper