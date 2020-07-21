const axios = require("axios");
const cheerio = require('cheerio');

module.exports = {
    travelScraper: async (req, res) => {
        const html = await axios.get('https://www.goworldtravel.com/');
         const $ = await cheerio.load(html.data);
       
        
         let data = [];

        $('article').each((i, elem) => {
            if (i <= 3) {
            data.push({
                img: $(elem).find('a > img').attr('data-lazy-src'),
                link: $(elem).find('a').attr('href'),
                title: $(elem).find('a > img').attr('alt')
            })
            }
        });
    
        
        res.status(200).send(data)   
    }
    
}
