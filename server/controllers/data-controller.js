const scrape =require('../scrapers/dataScrape')
const e = require('express')


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
        // console.log(req.body);
        
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
        req.body = {category : 'cat_movies'}
        const {category} = req.body

        const categoryData = await db.query(`select * from ${category}`)

        if(!categoryData) {
            return res.status(500).send("Cannot locate user categories")
        }

        try {
            const data = await scrape.scrape(categoryData)
            // console.log(data);
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
              title: 'Disneyland Reopening Delayed',
              img: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2020/05/Disneyland-Park-Mickey-and-Minnie.jpg?q=50&fit=crop&w=830&h=419&dpr=1.5 1245w',
              link: '/disneyland-reopening-date-delayed/'
            },
            {
              title: 'Gone With The Wind Is Back On HBO Max With New Video Intro',
              img: 'https://static3.srcdn.com/wordpress/wp-content/uploads/2016/11/Gone-With-The-Wind-wallpaper.jpg?q=50&fit=crop&w=316&h=223&dpr=1.5 474w',
              link: '/gone-wind-movie-hbo-max-video-intro/'
            },
            {
              title: 'HBO Max: Every Movie & TV Show Coming In July 2020',
              img: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/06/HBO-Max-Movies-July.jpg?q=50&fit=crop&w=316&h=223&dpr=1.5 474w',
              link: '/hbo-max-july-2020-movies-shows-release-dates/'
            },
            {
              title: 'Russo Brothers Endorse Extraction Movie Recreation Made By Fans',
              img: 'https://static0.srcdn.com/wordpress/wp-content/uploads/2020/06/Extraction.jpg?q=50&fit=crop&w=316&h=223&dpr=1.5 474w',
              link: '/extraction-movie-trailer-fan-remake-russo-brothers-reaction/'
            }
          ]
          for(let i=0; i < req.body.length; i++) {
            const obj = req.body[i]
            const {title, img, link} = obj
           // console.log(title)
            const insertToDb = await db.get_category_data([user_id, category, title, img, link]);
            if(!insertToDb){
                return res.status(500).send("Insert failed")
            }
          }

          res.status(200).send("Inserts successful")
    },
    getArticles: (req, res) => {},
    getArticlesByUser: (req, res) => {},
}