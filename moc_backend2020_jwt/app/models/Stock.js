module.exports = (sequelize, Sequelize) => {
    // name table
    var nametable = 'stock';
    const Stock = sequelize.define(nametable,{
    
        no:{
          type:Sequelize.INTEGER,
          primaryKey:true,
          autoIncrement:true
        },
        productCategory:  Sequelize.STRING,
        initialQuantity :Sequelize.INTEGER,
        availablequantity  : Sequelize.INTEGER,
        totalquantity:  Sequelize.INTEGER,
    
})
  
return Stock;
}