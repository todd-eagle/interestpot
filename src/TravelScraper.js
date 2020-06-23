import axios from 'axios'
import cheerio from 'cheerio'

const TravelScraper = async () => {
  const html = await axios.get('https://www.lonelyplanet.com/news')
     const $ = cheerio.load(html.data)
    // let data =[]
    // axios.get('http://www.afar.com/')
    // .then(res => {
    //     const $ = cheerio.load(res.data)
    //     console.log('res ', res.data)
    // })
    // .catch(err => {console.log(err)})

   //Title
   console.log($('.ContentList').find('h3 > a').html() );
   //Image
   console.log($('.ContentList').find('.ListItemThumbnail > a > img').attr('src') );
   //Link
    console.log($('.ContentList').find('.ListItemThumbnail > a').attr('href') );

//Title
// console.log($('.block block--article-listing').html())
// //Image
// console.log($$('.ContentList').find('.ListItemThumbnail > a > img').attr('src') );
// //Link
//  console.log($$('.ContentList').find('.ListItemThumbnail > a').attr('href') );


}

export default TravelScraper