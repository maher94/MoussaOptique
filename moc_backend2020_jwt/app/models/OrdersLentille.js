module.exports = (sequelize, Sequelize) => {
    // name table
    var nametable = 'ordersLentille';
    const ordersLentille = sequelize.define(nametable,{
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
          pss:Sequelize.STRING,
          
          
        })
        sequelize.sync();
        return ordersLentille;
      }