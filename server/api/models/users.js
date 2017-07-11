export default(sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    fullName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastLogout: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};
