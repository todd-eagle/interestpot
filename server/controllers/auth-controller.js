const bcryptjs = require('bcryptjs')

module.exports = {
    register: async( req, res ) => {
        const db = req.app.get('db');
        const {email, password} = req.body

        const [registered] = await db.users.find({email})
        // console.log("Registered? ", registered)

        if(registered){
            return res.status(409).send('User already exists')
        }

        const hash = (bcryptjs.hashSync(password, bcryptjs.genSaltSync(10)))
       // console.log("hashed password: ", hash)
      
        const newUser = await db.users.insert({email:email, password:hash}) 
    
        
        req.session.user = {
          id: newUser.id,
          email: newUser.email
        }
        
       // console.log("req.session.user", req.session.user)
        res.status(200).send(req.session.user)
    },
    
    login: async( req, res ) => {
     
        const db = req.app.get('db');
        const {email, password} = req.body 
        console.log("req.body", req.body)
        const userFound = await db.users.find({email})
        
        if(!userFound){
          return res.status(404).send('User not found! Please Register.')
        }

        // console.log("UserFound Id: ", userFound[0].id)
  
        const authenticate = bcryptjs.compareSync(password, userFound[0].password)
        if(authenticate){
          req.session.user = {
            id: userFound[0].id,
            email: userFound[0].email,
          }
          req.session.save()
          return res.status(200).send(req.session.user)
        }
             res.status(403).send('Email or password is incorrect')
    },

    getSessionUser: (req, res) => {
      console.log("req.session.user ", req.session.user)
      if(req.session.user){
        res.status(200).send(req.session.user)
      }else{
        res.sendStatus(500)
      }
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    } 
}