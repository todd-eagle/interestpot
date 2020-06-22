require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgp = require('pg-promise')();
const massive = require('massive');
const authCrtl = require('./controllers/auth-controller')
const dataCtrl = require('./controllers/data-controller')

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

const app = express();

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

app.get('/api/categories/:table_name', dataCtrl.getCategories)
app.post('/api/categories/', dataCtrl.postCategoriesByUser)