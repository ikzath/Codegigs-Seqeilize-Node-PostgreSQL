const Sequelize = require('sequelize');

// Option 2: Passing parameters separately (other dialects)
module.exports = new Sequelize('test-file', 'postgres', 'uhk12345', {
    host: 'localhost',
    dialect:  'postgres',
    operatorAliases: false,

    pool: {
        max: 5,
        min:0,
        acquire: 30000,
        idle: 10000
    }
  });