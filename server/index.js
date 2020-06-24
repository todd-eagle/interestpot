require('dotenv').config();
const express = require('express');
const session = require('express-session');
const massive = require('massive');
const authCrtl = require('./controllers/auth-controller')
const dataCtrl = require('./controllers/data-controller')
const scraper = require('./scrapers/scraper-controller')
const cors = require('cors')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();
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

app.get('/api/category_tables/:table_name', dataCtrl.getCategories)
app.post('/api/categories/', dataCtrl.postCategoriesByUser)
app.get('/api/categories/:user_id', dataCtrl.getUserCategories)
app.get('/api/categories/:user_id', dataCtrl.getUserCategories)
app.get('/api/category-data', dataCtrl.getCategoryData)
app.get('/api/scraper/', scraper.travelScraper)