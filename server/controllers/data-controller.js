const scrape =require('../scrapers/dataScrape')
const e = require('express')

const axios = require("axios");
const cheerio = require('cheerio');


module.exports =  {
    getCategories: async (req, res) => {
        const db = req.app.get('db')
        const {table_name} = req.params

        const category_names = await db.get_all_categories([table_name])
        
        if(!category_names[0]){
            return res.status(500).send("Internal server error: could not retrieve categories")
        }
        
        res.status(200).send(category_names)      
    },
    postCategoriesByUser: async(req, res) => {
        const db = req.app.get('db')
        console.log(req.body);
        
        const profile = await db.user_profile.insert(req.body)  
        //console.log(profile)
        if(!profile){
            return res.status(500).send("Internal server error: could not insert profile data")
        }

        res.status(200).send(profile)
    },
    getUserCategories: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        const user_categories = await db.user_profile.find({user_id})
        console.log(user_categories);
        
        if(!user_categories) {
            return res.status(500).send("Cannot locate user categories")
        }

        res.status(200).send(user_categories)
    },
    deleteUserCategories: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const {category} = req.body

        const removeCategories = await db.query(`DELETE FROM user_profile WHERE category = ${category} && user_id = ${user_id}`)

        if(!removeCategories){
            return res.status(500).send("Delete failed")
        }
        res.status(200).send("Delete successful")
    },
    getCategoryData: async (req, res) => {
        const db = req.app.get('db')
        req.body = {category : 'cat_travel'}
        const {category} = req.body

        const categoryData = await db.query(`select * from ${category}`)

        if(!categoryData) {
            return res.status(500).send("Cannot locate user categories")
        }

        try {
            const data = await scrape.scrape(categoryData)
            return res.status(200).send(data)
        }catch (err){
           return  res.status(500).send(`Huh?: ${err}`)
        }
        
       
        

        


    },
    postUserCategoryLinks: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params
        const {category} = {category: 'cat_movies'}
        req.body = [
            {
                status: "fulfilled",
                value: {
                    '1': {
                        img: "https://cdn.collider.com/wp-content/uploads/2020/06/rise-of-the-tomb-raider-slice.jpeg",
                        link: "https://collider.com/ps-plus-free-games-july-2020/",
                        title: "PlayStation Plus Free Games for July 2020 Include 2015’s ‘Rise of the Tomb Raider’"
                    },
                    '2': {
                        img: "https://cdn.collider.com/wp-content/uploads/2020/06/rise-of-the-tomb-raider-slice.jpeg",
                        link: "https://collider.com/ps-plus-free-games-july-2020/",
                        title: "PlayStation Plus Free Games for July 2020 Include 2015’s ‘Rise of the Tomb Raider’"
                    },
                    '3': {
                        img: "https://cdn.collider.com/wp-content/uploads/2020/06/rise-of-the-tomb-raider-slice.jpeg",
                        link: "https://collider.com/ps-plus-free-games-july-2020/",
                        title: "PlayStation Plus Free Games for July 2020 Include 2015’s ‘Rise of the Tomb Raider’"
                    }
                }
              },
              {
                status: "fulfilled",
                value: {
                    '1': {
                        img: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/06/Painting-of-Tony-Todd-in-Candyman-brighter.jpg?q=50&fit=crop&w=830&h=419&dpr=1.5 1245w",
                        link: "/candyman-2020-movie-trailer-tony-todd-role-cameo/",
                        title: "Candyman Movie Trailer Teases Tony Todd’s Return"
                    },
                    '2': {
                        img: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/06/Painting-of-Tony-Todd-in-Candyman-brighter.jpg?q=50&fit=crop&w=830&h=419&dpr=1.5 1245w",
                        link: "/candyman-2020-movie-trailer-tony-todd-role-cameo/",
                        title: "Candyman Movie Trailer Teases Tony Todd’s Return"
                    },
                    '3': {
                        img: "https://static2.srcdn.com/wordpress/wp-content/uploads/2020/06/Painting-of-Tony-Todd-in-Candyman-brighter.jpg?q=50&fit=crop&w=830&h=419&dpr=1.5 1245w",
                        link: "/candyman-2020-movie-trailer-tony-todd-role-cameo/",
                        title: "Candyman Movie Trailer Teases Tony Todd’s Return"
                    }
                }
              },
              {
                status: "fulfilled",
                value: {
                    '1': {
                        img: "<div class=\"image-loading\"></div><div style=\"height:100%\" class=\"lazyload-placeholder\"></div>",
                        link: "/movies/news/jennifer-hudson-is-aretha-franklin-in-the-respect-teaser-trailer/",
                        title: "Jennifer Hudson Is Aretha Franklin In The Respect Teaser Trailer"
                    },
                    '2': {
                        img: "<div class=\"image-loading\"></div><div style=\"height:100%\" class=\"lazyload-placeholder\"></div>",
                        link: "/movies/news/jennifer-hudson-is-aretha-franklin-in-the-respect-teaser-trailer/",
                        title: "Jennifer Hudson Is Aretha Franklin In The Respect Teaser Trailer"
                    },
                    '3': {
                        img: "<div class=\"image-loading\"></div><div style=\"height:100%\" class=\"lazyload-placeholder\"></div>",
                        link: "/movies/news/jennifer-hudson-is-aretha-franklin-in-the-respect-teaser-trailer/",
                        title: "Jennifer Hudson Is Aretha Franklin In The Respect Teaser Trailer"
                    }
                }
              }
        ]

        req.body.forEach( async el =>{
            for(let key in el.value){
              console.log(el.value[key])
              const {img, link, title} = el.value[key]
              const insertToDb = await db.get_category_data([user_id, category, title, img, link]);
              if(!insertToDb){
                  return res.status(500).send("Insert failed")
              }            
            }
        })
         
        //   for(let i=0; i < req.body.length; i++) {
        //     const obj = req.body[i]
        //     const {title, img, link} = obj
        //    // console.log(title)
        //     const insertToDb = await db.get_category_data([user_id, category, title, img, link]);
        //     if(!insertToDb){
        //         return res.status(500).send("Insert failed")
        //     }
        //   }

          res.status(200).send("Inserts successful")
    }, 
    getArticles: (req, res) => {},
    getArticlesByUser: (req, res) => {},
    testScrape: async(req, res) => {
        
        const html = await axios.get('https://www.travelandleisure.com/travel-news')
        const $ = await cheerio.load(html.data)	

        const data = {
            img: $('.category-page-item').find('.category-page-item-image > a > div').attr('data-src'),
            link: $('.category-page-item').find('.category-page-item-content > a').attr('href'),
            title: $('.category-page-item').find('.category-page-item-content > a > h3').html()
          }

        // const data = {
        //     title: $('.category-page-item-content').find('h3').html(),
        //     img: $('.category-page-item-image').find('div').attr('data-src'),
        //     link:  $('.category-page-item-content').find('a').attr('href')
        //   }
          res.status(200).send(data)
    }
}