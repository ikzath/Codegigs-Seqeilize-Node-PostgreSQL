const Sequelize = require('sequelize');
const db = require('../config/databases');

//create a new schema
const Gig = db.define('gig', {
    title: {
        type: Sequelize.STRING
    },
    technologies: {
        type: Sequelize.STRING
    },
    description: {
        type: Sequelize.STRING
    },
    budget: {
        type: Sequelize.STRING
    },   
    contact_email: {
        type: Sequelize.STRING
    }

});

module.exports = Gig;