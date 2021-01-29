
const controllers = {}

var sequelize = require('../models/database');
//var Orders = require('../models/Orders');

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
  
    res.json({ success:true, data: data, message: "Updated successfuly"});
  
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
     
    const data = await OrdersLentille.findAll({ limit: 6 ,order:sequelize.literal('Orderdate DESC')})
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
    const {Orderdate, Category, Products, Comment,qte,pss,Status,userId,price,paidAmount,partiallyPaidAmount,amountStillToPay } = req.body;
   
    //create
    const data = await OrdersLentille.create({
      Orderdate:Orderdate,
      Category:Category,
      Products:Products,
      Status:Status,
      Comment:Comment,
      qte:qte,
      pss:pss,
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


  controllers.countPercentage = async (req, res) => {
    const data = await db.sequelize.query('	SELECT count(*) as nbLenses,(select count(*) from optika.OrdersProduits  )as nbProduct,(select count(*) from ordersproduits)+(select count(*) from orderslentilles) as total FROM orderslentilles;', {
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
    res.json({success:true, data:data});
  
  }
  controllers.getNbOrdersByMonth =async (req, res) => {
    
    const data = await db.sequelize.query('select MONTHNAME(orderslentilles.Orderdate) as monthName,count(*) as nbOrders from orderslentilles     where   year(Orderdate) in (2020,2021)    group by MONTHNAME(orderslentilles.Orderdate)    order by month(orderslentilles.Orderdate);', {
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
     
  }
  controllers.totalProfitLenses =async (req, res) => {
    
    const data = await db.sequelize.query('select sum(paidAmount) as lensesProfit from orderslentilles;', {
    model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
     
  }
  controllers.listALLOrders = async (req, res) => {
    const data = await db.sequelize.query('select * from optika.orderslentilles union select * from optika.ordersproduits;', {
    model: db.OrdersLentille,
    model:db.OrdersProduit,
     type: sequelize.QueryTypes.SELECT
  })
    res.json({success:true, data:data});
  
  }
  controllers.listLenses = async (req,res) => {
    const data = await db.sequelize.query(' select orderslentilles.* ,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id order by orderslentilles.Orderdate desc    ', {
     
      model:db.OrdersProduit,
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    
    controllers.listValidatedLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Validated" order by orderslentilles.Orderdate desc   ;', {
      model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    
    controllers.listDraftLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Draft" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listRejectedLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Rejected" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listCreatedLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Created" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listWaitingValidationOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="WaitingValidation" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listInProgressLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="InProgress" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listSuspendedLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Suspended" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listPaidLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="Paid" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.listPartiallyPaidLensesOrders = async (req, res) => {
      const data = await db.sequelize.query('select  orderslentilles.*,users.FirstName , users.LastName from optika.orderslentilles,users where userId=users.id and status="PartiallyPaid" order by orderslentilles.Orderdate desc   ;', {
        model: db.OrdersLentille,
    
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.countPercentage = async (req, res) => {
      const data = await db.sequelize.query('	SELECT count(*) as nbLenses,(select count(*) from optika.OrdersProduits  )as nbProduct,(select count(*) from ordersproduits)+(select count(*) from orderslentilles) as total FROM orderslentilles;', {
      model: db.OrdersLentille,
       type: sequelize.QueryTypes.SELECT
    })
      res.json({success:true, data:data});
    
    }
    controllers.getNborderbyPss =async (req,res) => {
    
      const data = await db.sequelize.query('select pss,count(*) as nb from optika.orderslentilles group by optika.orderslentilles.pss', {
      model: db.OrdersLentille,
       type: sequelize.QueryTypes.SELECT
    })
    
      res.json({ success: true, data:data });
       
    }
    controllers.getNborderbyStatus =async (req,res) => {
    
      const data = await db.sequelize.query('SELECT count(*) as nb,status FROM optika.orderslentilles group by Status;', {
      model: db.OrdersProduit,
       type: sequelize.QueryTypes.SELECT
    })
    
      res.json({ success: true, data:data });
       
    }
    controllers.LensesPayment =async (req,res) => {
      
        const { amount } = req.params;
        const { Orderno } = req.params;
      const data = await db.sequelize.query('update optika.orderslentilles set amountStillToPay=amountStillToPay-:amount ,partiallyPaidAmount=partiallyPaidAmount+ :amount ,paidAmount=paidAmount+ :amount where Orderno=(:Orderno) ', {

        replacements: {amount: amount,Orderno: Orderno},

        model: db.OrdersLentille,
       type: sequelize.QueryTypes.UPDATE
    })
    
      res.json({ success: true, data:data });
       
    }
    controllers.amountStillToPay =async (req,res) => {
      
      
      const { Orderno } = req.params;
    const data = await db.sequelize.query('SELECT amountStillToPay FROM optika.orderslentilles where Orderno=(:Orderno) ', {

      replacements: {Orderno: Orderno},

      model: db.OrdersLentille,
     type: sequelize.QueryTypes.SELECT
  })
  
    res.json({ success: true, data:data });
     
  }
    
module.exports = controllers;