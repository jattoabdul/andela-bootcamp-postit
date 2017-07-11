export default(sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    lastLogin: DataTypes.DATE,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    lastLogout: DataTypes.DATE
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return Users;
};
