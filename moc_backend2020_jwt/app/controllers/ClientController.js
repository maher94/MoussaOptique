const controllers = {}

var sequelize = require('../models/database');
var Client = require('../models/Client');



sequelize.sync()

controllers.delete = async (req,res) => {

  // parameter post
  const { Clientno } = req.params;
  // delete sequelize
  const del = await Client.destroy({
    where: { Clientno: Clientno }
  })
  res.json({success:true, deleted:del, message:"Deleted successful"});

}

controllers.update = async (req, res) => {
  // parameter id get
  const { Clientno } = req.params;
  // parameter post
  const { Orderdate, Category, Products, Status, Comment,qte,pss } = req.body;
  // update data
  const data = await Client.update({
    Orderdate: Orderdate,
    Category:Category,
    Products:Products,
    Status:Status,
    Comment:Comment,
    qte:qte,
    pss:pss
  },{
    where: { Clientno: Clientno }
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
  const { Clientno } = req.params;
  const data = await Client.findAll({
    where: { Clientno: Clientno},
    
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
  const data = await Client.findAll({
     
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
  const {name, email, address, phone, role } = req.body;
   
  //create
  const data = await Client.create({
    name:name,
    email:email,
    address:address,
    phone:phone,
    roleId:role
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

module.exports = controllers;