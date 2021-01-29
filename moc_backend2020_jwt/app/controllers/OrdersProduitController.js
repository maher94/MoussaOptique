
const controllers = {}

var sequelize = require('../models/database');
//var Orders = require('../models/Orders');
var Client = require('../models/Client');

const db = require("../models");

const OrdersProduit = db.OrdersProduit;

sequelize.sync()
controllers.delete = async (req,res) => {

    // parameter post
    const { Orderno } = req.params;
    // delete sequelize
    const del = await OrdersProduit.destroy({
      where: { Orderno: Orderno }
    })
    res.json({success:true, deleted:del, message:"Deleted successful"});
  
  }
  
controllers.update = async (req, res) => {
    // parameter id get
    const { Orderno } = req.params;
    // parameter post
    const { Orderdate, Category, Products, Status, Comment,qte,volume } = req.body;
    // update data
    const data = await OrdersProduit.update({
      Orderdate: Orderdate,
      Category:Category,
      Products:Products,
      Status:Status,
      Comment:Comment,
      qte:qte,
      volume:volume
    },{
      where: { Orderno: Orderno }
    })
    .then( function (data){
      return data;
    })
    .catch(error => {
      return error;
    })
  
    res.json({ success:true, data: data, message: "Updated successfuly"});
  
  }
  
  controllers.get = async (req, res) => {
    const { Orderno } = req.params;
    const data = await OrdersProduit.findAll({
      where: { Orderno: Orderno}
      
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
    const data = await OrdersProduit.findAll({
      where: { userId: userId},order:sequelize.literal('Orderno DESC')
    })
    .then(function(data){
      return data;
    })
    .catch(error =>{
      return error;
    })
    res.json({ success: true, data:data });
  }
  controllers.AllOrders = async (req,res) => {

    const data = await OrdersProduit.findAll({limit: 6,
      order:sequelize.literal('Orderdate DESC')
       
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
    const {Orderdate, Category, Products, Comment,qte,volume,userId,Status,price,paidAmount,partiallyPaidAmount,amountStillToPay } = req.body;
   
    //create
    const data = await OrdersProduit.create({
      Orderdate:Orderdate,
      Category:Category,
      Products:Products,
      Status:Status,
      Comment:Comment,
      qte:qte,
      volume:volume,
      userId:userId,
      price:price,
      paidAmount:paidAmount,
      partiallyPaidAmount:partiallyPaidAmount,
      amountStillToPay:amountStillToPay
  
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
    const data = await OrdersProduit.update({
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
  controllers.countall = async (req, res) => {
    const { userId } = req.params;
    const { count, rows } = await OrdersProduit.findAndCountAll({
      
    }
    ,{
      where: { userId: userId},
    })
    res.json({success:true, count:count});
  
  }
  controllers.countProductOrdersByStatus = async (req, res) => {
    const { userId } = req.params;
    const { status } = req.params;
    const data = await db.sequelize.query('select count(*) as nb from OrdersProduits where userId=(:userId) and status=(:status) ', {
    replacements: {userId: userId,status: status},
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
    res.json({success:true, data:data});
  
  }
  controllers.getClientdescriptionByOrdersProduit =async (req, res) => {
    const { Orderno } = req.params;
    const data = await db.sequelize.query('select *, (SELECT firstname FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as FirstName , (SELECT LastName FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as Name , (SELECT adresse FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as Adresse , (SELECT city FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as City , (SELECT PostalCode FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as PostalCode , (SELECT country FROM users where id =(select userId from OrdersProduits where Orderno=(:Orderno)))  as Country  from OrdersProduits  where Orderno=(:Orderno) ', {
      replacements: {Orderno: Orderno},
    model: db.OrdersProduit,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
    
  
  
  
  
  }

  controllers.getNbOrdersByMonth =async (req, res) => {
    
    const data = await db.sequelize.query('select MONTHNAME(ordersproduits.Orderdate) as monthName,count(*) as nbOrders from ordersproduits     where   year(Orderdate) in (2020,2021)    group by MONTHNAME(ordersproduits.Orderdate)    order by month(ordersproduits.Orderdate);', {
    model: db.OrdersProduit,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
     
  }
  controllers.totalProfitProduct =async (req, res) => {
    
    const data = await db.sequelize.query('select sum(paidAmount) as ProductProfit from ordersproduits ', {
    model: db.OrdersProduit,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
     
  }
  controllers.listProduct = async (req,res) => {
     
    const data = await db.sequelize.query(' select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id order by ordersproduits.Orderdate desc    ', {
     
      model:db.OrdersProduit,
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listValidatedProductOrders = async (req, res) => {
      const data = await db.sequelize.query(' select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Validated" order by ordersproduits.Orderdate desc    ', {

        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    
    controllers.listDraftProductOrders = async (req, res) => {
      const data = await db.sequelize.query(' select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Draft" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listRejectedProductOrders = async (req, res) => {
      const data = await db.sequelize.query(' select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Rejected" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listCreatedProductOrders = async (req, res) => {
      const data = await db.sequelize.query(' select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Created" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listWaitingValidationProductOrders = async (req, res) => {
      const data = await db.sequelize.query('select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="WaitingValidation" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listInProgressProductOrders = async (req, res) => {
      const data = await db.sequelize.query('select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="InProgress" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listSuspendedProductOrders = async (req, res) => {
      const data = await db.sequelize.query('select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Suspended" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listPaidProductOrders = async (req, res) => {
      const data = await db.sequelize.query('select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="Paid" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listPartiallyPaidProductOrders = async (req, res) => {
      const data = await db.sequelize.query('select ordersproduits.* ,users.FirstName , users.LastName from optika.ordersproduits,users where userId=users.id and status="PartiallyPaid" order by ordersproduits.Orderdate desc    ', {
        model: db.OrdersProduit,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.getNborderbyVolume =async (req,res) => {
    
      const data = await db.sequelize.query('select volume,count(*) as nb from optika.ordersproduits group by optika.ordersproduits.volume', {
      model: db.OrdersProduit,
       type: sequelize.QueryTypes.SELECT
    })
    
      res.json({ success: true, data:data });
       
    }
    
    controllers.getNborderbyStatus =async (req,res) => {
    
      const data = await db.sequelize.query('SELECT count(*) as nb,status FROM optika.ordersproduits group by Status;', {
      model: db.OrdersProduit,
       type: sequelize.QueryTypes.SELECT
    })
    
      res.json({ success: true, data:data });
       
    }
    controllers.productPayment =async (req,res) => {
      
      const { amount } = req.params;
      const { Orderno } = req.params;
    const data = await db.sequelize.query('update optika.ordersproduits set amountStillToPay=amountStillToPay-:amount ,partiallyPaidAmount=partiallyPaidAmount+ :amount ,paidAmount=paidAmount+ :amount where Orderno=(:Orderno) ', {

      replacements: {amount: amount,Orderno: Orderno},

      model: db.OrdersProduit,
     type: sequelize.QueryTypes.UPDATE
  })
  
    res.json({ success: true, data:data });
     
  }
  controllers.amountStillToPay =async (req,res) => {
       const { Orderno } = req.params;
  const data = await db.sequelize.query('SELECT amountStillToPay FROM optika.ordersproduits where Orderno=(:Orderno) ', {

    replacements: {Orderno: Orderno},

    model: db.OrdersProduit,
   type: sequelize.QueryTypes.SELECT
})

  res.json({ success: true, data:data });
   
}
module.exports = controllers;