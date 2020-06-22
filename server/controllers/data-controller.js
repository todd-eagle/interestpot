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
        
        if(!profile[0]){
            return res.status(500).send("Internal server error: could not insert profile data")
        }

        res.status(200).send(profile)
    },
    postArticles: (req, res) => {},
    getArticles: (req, res) => {},
    getArticlesByUser: (req, res) => {},
}