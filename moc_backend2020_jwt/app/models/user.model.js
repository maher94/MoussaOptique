module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    
    Adresse: Sequelize.STRING,
    PhoneNumber: Sequelize.INTEGER,
    FirstName: Sequelize.STRING,
    LastName: Sequelize.STRING,
    Adresse2: Sequelize.STRING,
    Country: Sequelize.STRING,
    PostalCode: Sequelize.INTEGER,
    city:Sequelize.STRING,
    imageUrl:Sequelize.STRING,
    sexe:Sequelize.STRING


  });

  return User;
};
