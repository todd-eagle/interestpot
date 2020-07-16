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
        console.log("hashed password: ", hash)
      
        const newUser = await db.users.insert({email:email, password:hash}) 
    
        
        req.session.user = {
          id: newUser.id,
          email: newUser.email
        }
        
        console.log("req.session.user", req.session.user)
        res.status(200).send(req.session.user)
    },
    
    login: async( req, res ) => {
     
        const db = req.app.get('db');
        const {email, password} = req.body 
  
        const [userFound] = await db.check_for_user(email)
        
        if(!userFound){
          return res.status(404).send('User not found! Please Register.')
        }
  
        const authenticate = bcryptjs.compareSync(password, userFound.password)
        if(authenticate){
          req.session.user = {
            id: userFound.id,
            email: userFound.email,
          }
          return res.status(200).send(req.session.user)
        }
             res.status(403).send('Email or password is incorrect')
    },

    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    } 
}