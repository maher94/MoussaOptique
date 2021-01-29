
const db = require("../models");
var sequelize = require('../models/database');
sequelize.sync();
const User = db.user;
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.list = async (req,res) => {
  const data = await User.findAll({})
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data:data });
}
exports.list5Clients = async (req,res) => {
  const data = await User.findAll({ limit: 5 })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data:data });
}
exports.update = async (req, res) => {
  // parameter id get
  const { userid } = req.params;
  // parameter post
  const {FirstName,LastName,email,PhoneNumber,Adresse,Adresse2,Country,PostalCode,city } = req.body;
  // update data
  const data = await User.update({
     FirstName:FirstName,
     LastName:LastName,
     email:email,
     PhoneNumber:PhoneNumber,
     Adresse:Adresse,
     Adresse2:Adresse2,
     Country:Country,
     PostalCode:PostalCode,
     city:city,

  },{
    where: { id : userid }
  })
  .then( function (data){
    return data;
  })
  .catch(error => {
    return error;
  })

  res.json({ success:true, data: data, message: "Updated successful"});

}

exports.listByUsername = async (req,res) => {
  const { username } = req.params;
  const data = await User.findAll({
    where: { username: username},
  })
  .then(function(data){
    return data;
  })
  .catch(error =>{
    return error;
  })
  res.json({ success: true, data:data });
}
exports.countClient = async (req, res) => {
  const { userId } = req.params;
  const { Status } = req.params;
  const data = await db.sequelize.query('select count(*) as nb from users  ', {
   
  model: db.user,
   type: sequelize.QueryTypes.SELECT
})
  res.json({success:true, data:data});

}
