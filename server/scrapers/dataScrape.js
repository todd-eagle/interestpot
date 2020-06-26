const axios = require("axios");
const cheerio = require('cheerio');


const  scrape = async (a, b) => {

  const html = await axios.get(b)
  const $ = cheerio.load(html.data)

  let data =[] 
  const catData = a.map((e, index) => {
    e[index]['data']
  })


//  const html = await axios.get('https://screenrant.com/movie-news/')
//  const $ = cheerio.load(html.data)
  // let data =[]  
   // data = a[1]['data']

  //  $('article').each((i, elem) => {
  //   if (i <= 3) {
  //     data.push({
  //           title: $(elem).find('a.bc-title-link').attr('title'),
  //           img: $(elem).find('.responsive-img').find('picture').find('source').attr('data-srcset'),
  //           link:  $(elem).find('.bc-img-link').attr('href')
  //     })
  //   }
  // });

     return catData
}


exports.scrape=scrape