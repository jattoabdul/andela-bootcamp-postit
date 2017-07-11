export default (sequelize, DataTypes) => {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true 
    },
    lastLogout: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Users;
};