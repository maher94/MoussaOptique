const Sequelize = require('sequelize');
var sequelize = require('./database');

 
// name table
var nametable = 'client';
var Client = sequelize.define(nametable,{

    clientno:{
      type:Sequelize.INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    clientName:  Sequelize.STRING,
    clientAdresse: Sequelize.STRING,
    clientPhoneNumber: Sequelize.INTEGER,
    clientFirstName: Sequelize.STRING,
    clientName: Sequelize.STRING,
    clientAdresse2: Sequelize.STRING,
    country: Sequelize.STRING,
    PostalCode: Sequelize.INTEGER,
    city:Sequelize.STRING,
    userName:Sequelize.STRING,
    password:Sequelize.STRING,

    
    
  })
  
  
  module.exports = Client