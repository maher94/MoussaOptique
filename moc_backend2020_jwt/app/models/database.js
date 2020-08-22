var Sequelize = require('sequelize');


const sequelize = new Sequelize(
  'optika', // database
  'root', // user / usuario
  'root', //password
  {
    host: 'localhost',
    dialect: 'mysql'
    ,
    
  }
  
);

module.exports = sequelize;