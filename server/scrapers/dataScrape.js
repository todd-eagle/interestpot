const axios = require("axios");
const cheerio = require('cheerio');


const  scrape = async (catData) => {

  // const html = await axios.get(url)
  // const $ = cheerio.load(html.data)
  //data = catData
  //console.log(data)
  const linkData = catData.map( async  (e, index) => {
   
      try{
        const html = await axios.get(e.url)
        const $ = await cheerio.load(html.data)
        console.log(e.root)
       
        $('' + e.root + '').each((i, elem) => {
            if (i <= 3) {
            const dataStuff ={
              img: eval(e.data.img),
              link: eval(e.data.link),
              title: eval(e.data.title)
            }
            console.log(dataStuff);
            
            return dataStuff
         }
         
        })
 
      
      
      }catch (err) {
        console.log(err)
      }
     
  })


//  const html = await axios.get('https://screenrant.com/movie-news/')
//  const $ = cheerio.load(html.data)
//   let data =[]  

//   // data = catData[1]['data']

//    $('article').each((i, elem) => {
//     if (i <= 3) {
//       data.push({
//             title: $(elem).find('a.bc-title-link').attr('title'),
//             img: $(elem).find('.responsive-img').find('picture').find('source').attr('data-srcset'),
//             link:  $(elem).find('.bc-img-link').attr('href')
//       })
//     }
//   });

  let resultsForNow = []
  await Promise.allSettled(linkData)
  .then(res => {
    resultsForNow = [...res]
  })
  console.log(resultsForNow);
  
  return resultsForNow
}


exports.scrape=scrape