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
    getCategoryUrlData: async (req, res) => {
        const db = req.app.get('db')
        console.log(db)
        const {user_id} = req.params
        console.log(user_id)

        const user_categories = await db.user_profile.find({user_id})
        console.log(user_categories);
        
        if(!user_categories) {
            return res.status(500).send("Cannot locate user categories")
        }

        res.status(200).send(user_categories)
    },
    postArticles: (req, res) => {},
    getArticles: (req, res) => {},
    getArticlesByUser: (req, res) => {},
}