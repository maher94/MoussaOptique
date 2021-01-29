module.exports = (sequelize, Sequelize) => {
    // name table
    var nametable = 'ordersProduit';
    const ordersProduit = sequelize.define(nametable,{
        Orderno:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
          },
          Orderdate:  Sequelize.DATE,
          Category: Sequelize.STRING,
          Products: Sequelize.STRING,
          Status: Sequelize.STRING,
          Comment: Sequelize.STRING(30),
          qte:Sequelize.INTEGER,
          volume:Sequelize.STRING,
          price:Sequelize.INTEGER,
          partiallyPaidAmount:Sequelize.INTEGER,
          paidAmount:Sequelize.INTEGER,
          amountStillToPay:Sequelize.INTEGER,
          
        })
        return ordersProduit;
      }