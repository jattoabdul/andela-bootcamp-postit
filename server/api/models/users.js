export default(sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
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
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW")
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        Users.belongsToMany(models.Groups, { through: "GroupsUsers" });
      }
    }
  });
  return Users;
};
