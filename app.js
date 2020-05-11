const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Sequelize = require('sequelize');
const app = express();
const handlebars = require('express-handlebars');


//set-up template engline 
app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', handlebars);

// add static css files
app.use(express.static(path.join(__dirname, 'public')));

// add middleware for body-parser
app.use(bodyParser.urlencoded({ extended: false}));

//connect database
const db = require('./config/databases');

// test db
db.authenticate()
.then(()=>console.log('db connected...'))
.catch(err => console.log('Not connected because ' + err));  


app.get('/', (req, res)=>res.render('index', { layout: 'landing'}));  


//Gigs router 
app.use('/gigs', require('./routes/gigs'));

// connected port 
const PORT = process.env.PORT ||5000;
app.listen(PORT, console.log(`server running on ${PORT}`));