const scrape =require('../scrapers/dataScrape')

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
        
        const profile = await db.user_profile.insert(req.body)  
        if(!profile){
            return res.status(500).send("Internal server error: could not insert profile data")
        }

        res.status(200).send(profile)
    },
    getUserCategories: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        const user_categories = await db.user_profile.find({user_id})
        
        if(!user_categories) {
            return res.status(500).send("Cannot locate user categories")
        }

        res.status(200).send(user_categories)
    },
    deleteUserCategories: async (req, res) => {
        const db = req.app.get('db')
        const {user_id, category} = req.params
        console.log(req.params)
   
        console.log(`category = '${category}'`)
        

        const removeCategories = await db.query(`DELETE FROM user_profile WHERE category = '${category}' AND user_id = ${user_id}`)
        const removeListings = await db.query(`DELETE FROM user_landing_page WHERE category = '${category}' AND user_id = ${user_id}`)


        if(!removeCategories || !removeListings){
            return res.status(500).send("Delete failed")
        }
        res.status(200).send("Delete successful")
    },
    getCategoryData: async (req, res) => {
        const db = req.app.get('db')
        const {category} = req.params

        const categoryData = await db.query(`select * from ${category}`)
        //console.log(categoryData);
        
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
        const {category} = req.body

        req.body.data.forEach( async el =>{
            for(let key in el.value){
                let {img, link, title, url} = el.value[key]
                if(!(img === undefined)) {
                    if(img.includes('movieweb')){
                        img = img.substr(0, img.lastIndexOf(" "))
                    }
                    if(!(img.includes('https'))){
                        url = url.substr(0, url.lastIndexOf("/"))
                        img = url.concat('', img)
                    }
                }
                if(!(link === undefined)) {
                    if(!(link.includes('https'))){
                        if(url.includes('screenrant') || url.includes('lonelyplanet') 
                          || url.includes('usatoday')){
                            //removes everything after and including the last slash    
                            url = url.substr(0, url.lastIndexOf("/")) 
                        }
                        link = url.concat('', link)
                        //console.log(link)
                    }
                }
                const insertToDb = await db.get_category_data([user_id, category, title, img, link]);
                if(!insertToDb){
                    return res.status(500).send("Insert failed")
                }            
            }
        })

          res.status(200).send("Inserts successful")
    }, 
    getArticlesByUser: async (req, res) => {
        const db = req.app.get('db')
        const {user_id} = req.params

        const getData = await db.user_landing_page.find({user_id})

        if(!getData){
            return res.status(500).send("Cannot get data")
        } 

       // console.log(getData);
        

        res.status(200).send(getData)
    }
}