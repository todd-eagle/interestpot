const axios = require("axios");
const cheerio = require('cheerio');

const  scrape = async (catData) => {
  const n = 3;
  const linkData = catData.map( async  (e, index) => {
    let p = {}
    const html = await axios.get(e.url)
    const $ = await cheerio.load(html.data)
    $(''+ e.root +'').each((i, elem) => {
      if (i <= 3) {
        const dataStuff ={
          img: eval(e.data.img),
          link: eval(e.data.link),
          title: eval(e.data.title)
        }
        p[i+1] = Object.assign(dataStuff)
      }
    })

    return p
  })

  let resultsForNow = []
  await Promise.allSettled(linkData)
  .then(res => {
    resultsForNow = [...res]
   // console.log(res)
  })
  // console.log(resultsForNow);
  
  return resultsForNow
}

exports.scrape=scrape

