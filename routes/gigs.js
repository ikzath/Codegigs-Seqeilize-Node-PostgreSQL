const express = require('express');
const router = express.Router();
const db = require('../config/databases');
const Gig = require('../model/Gig');
const Sequelize = require('sequelize');
const op = Sequelize.Op;


//get gig list
router.get('/', (req, res)=> 
Gig.findAll()
.then(gigs => {
    console.log(gigs);
    res.render('gigs', {
    gigs});
})
.catch(err => console.log(err.message))
);

router.get('/add', (req, res)=>{
res.render('add');
});

//add new gig 
router.post('/add', (req, res)=>{
/*const data = {
    title: 'new title',
    technologies:  'javascript, python',
    description: 'full stack',
    budget: '2000', 
    contact_email: 'loooove@gmail.com'
}; */

let { title, technologies, description, budget, contact_email } = data;
let errors = [];

//check for validations
if(!title) {
    errors.push({text: 'title required'});
}

if(!technologies) {
    errors.push({text: 'technologies required'});
}

if(description) {
    errors.push({text: 'description required'});
}

if(!contact_email) {
    errors.push({text: 'email required'});
}

if(errors.length > 0) {
res.render('add', {
    errors,
    title, 
    technologies,
    description, 
    budget, 
    contact_email
});
}
else {

if(!budget) {
    budget = 'unknown';
} else {
    budget = `$${budget}`;
}

//make lowercase and replace spaces with a comma
technologies = technologies.toLowerCase(),replace(/, /g, ',');

Gig.create({
    title, 
    technologies,
    description, 
    budget, 
    contact_email
})

.then(gig => res.redirect('/gigs'))
.catch(err => console.log(err));
}
});

//search for gigs 
router.get('/search', (req, res)=> {
let { term } = req.query; 

//onvert term to lowercase
term = term.toLowerCase();

Gig.findAll({ where: { technologies: { [Op.like]: '%' + term + '%'} } } )
.then(gigs => res.render('gigs', { gigs }))
.catch(err => console.log(err));
});

module.exports = router;
