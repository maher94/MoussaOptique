
const controllers = {}

var sequelize = require('../models/database');
//var Orders = require('../models/Orders');
var Client = require('../models/Client');

const db = require("../models");

const OrdersLentille = db.OrdersLentille;

sequelize.sync()
controllers.delete = async (req,res) => {

    // parameter post
    const { Orderno } = req.params;
    // delete sequelize
    const del = await OrdersLentille.destroy({
      where: { Orderno: Orderno }
    })
    res.json({success:true, deleted:del, message:"Deleted successful"});
  
  }
  
controllers.update = async (req, res) => {
    // parameter id get
    const { Orderno } = req.params;
    // parameter post
    const { Orderdate, Category, Products, Status, Comment,qte,pss } = req.body;
    // update data
    const data = await OrdersLentille.update({
      Orderdate: Orderdate,
      Category:Category,
      Products:Products,
      Status:Status,
      Comment:Comment,
      qte:qte,
      pss:pss
    },{
      where: { Orderno: Orderno }
    })
    .then( function (data){
      return data;
    })
    .catch(error => {
      return error;
    })
  
    res.json({ success:true, data: data, message: "Updated successful"});
  
  }
  
  controllers.get = async (req, res) => {
    const { Orderno } = req.params;
    const data = await OrdersLentille.findAll({
      where: { Orderno: Orderno},
      
    })
    .then( function(data){
      return data;
    })
    .catch(error => {
      return error;
    })
    res.json({success:true, data:data});
  }
  
  controllers.list = async (req,res) => {
    const { userId } = req.params;
    const data = await OrdersLentille.findAll({
      where: { userId: userId},
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })
    res.json({ success: true, data:data });
  }
  
  controllers.create = async (req,res) => {
  
    // DATA parametros desde post
    const {Orderdate, Category, Products, Comment,qte,pss,Status,userId } = req.body;
   
    //create
    const data = await OrdersLentille.create({
      Orderdate:Orderdate,
      Category:Category,
      Products:Products,
      Status:Status,
      Comment:Comment,
      qte:qte,
      pss:pss,
      userId:userId
  
    })
    .then(function(data){
      return data;
    })
    .catch(error=>{
      console.log(error)
      return error;
    })
    // return res
    res.status(200).json({
      success:true,
      message:"success",
      data:data
    })
  
  }
  controllers.updateStatus = async (req, res) => {
    // parameter id get
    const { Orderno } = req.params;
    // parameter post
    const {  Status } = req.body;
    // update data
    const data = await OrdersLentille.update({
      Status:Status,
     
    },{
      where: { Orderno: Orderno }
    })
    .then( function (data){
      return data;
    })
    .catch(error => {
      return error;
    })
  
    res.json({ success:true, data: data, message: "Updated state successfuly"});
  
  }
  controllers.countLensesOrdersByStatus = async (req, res) => {
    const { userId } = req.params;
    const { Status } = req.params;
    const data = await db.sequelize.query('select count(*) as nb from orderslentilles where userId=(:userId) and Status=(:Status) ', {
    replacements: {userId: userId,Status: Status},
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
    res.json({success:true, data:data});
  
  }
  
  
  controllers.getClientdescriptionByOrdersLentille =async (req, res) => {
    const { Orderno } = req.params;
    const data = await db.sequelize.query('select *, (SELECT firstname FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as FirstName , (SELECT LastName FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as Name , (SELECT adresse FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as Adresse , (SELECT city FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as City , (SELECT PostalCode FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as PostalCode , (SELECT country FROM users where id =(select userId from orderslentilles where Orderno=(:Orderno)))  as Country  from orderslentilles  where Orderno=(:Orderno) ', {
      replacements: {Orderno: Orderno},
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
    
  
  
  
  
  }
module.exports = controllers;