require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCrtl = require('./controllers/auth-controller')
const dataCtrl = require('./controllers/data-controller')
const cors = require('cors')
const authCtrl = require('./controllers/auth-controller')
const scraperCtrl = require('./scrapers/scraper-controller')
const path = require('path')
// for production server

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

// production server
app.use(express.static(__dirname + '/../build'))


app.use(cors())
app.use(express.json());
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 1000 * 60 * 60 * 24 * 14 },
        secret: SESSION_SECRET   
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then( db => {
    app.set('db', db)
    console.log('Connected to db')
    app.listen( SERVER_PORT, () => console.log(`Connected to port ${SERVER_PORT}`))
}).catch(err=>console.log(err))

//production server
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname,'../build/index.html'))
})

app.get('/api/category_tables/:table_name', dataCtrl.getCategories)
app.post('/api/categories/', dataCtrl.postCategoriesByUser)
app.get('/api/categories/:user_id', dataCtrl.getUserCategories)
app.get('/api/category-data/:category', dataCtrl.getCategoryData)
app.post('/api/category-data/:user_id', dataCtrl.postUserCategoryLinks)
app.get('/api/articles/:user_id', dataCtrl.getArticlesByUser)
app.delete('/api/links/:user_id/:category', dataCtrl.deleteUserCategories)

app.post('/api/auth/register', authCtrl.register)
app.post('/api/auth/login', authCtrl.login)
app.delete('/api/auth/logout', authCtrl.logout)
app.get('/api/auth/session', authCrtl.getSessionUser)
app.put('/api/auth/user/:id', authCrtl.update)

app.get('/api/scraper', scraperCtrl.travelScraper)

