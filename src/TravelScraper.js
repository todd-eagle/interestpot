import axios from 'axios'
import cheerio from 'cheerio'

const TravelScraper = async () => {
    const html = await axios.get('https://www.travelandleisure.com/travel-news')
    const $ = cheerio.load(html.data)
    // let data =[]

//    console.log($('article > figure').find('.relative block cursor-pointer').attr('href')  );
   
   //Title
   console.log($('.LatestArticles').find('a > h2').html() );
   //Image
   console.log($('.LatestArticles').find('img').attr('src') );
   //Link
   console.log($('.LatestArticles').find('figure > a').attr('href') );


}

export default TravelScraper