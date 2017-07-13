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
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("NOW")
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        // Users.hasMany(models.Groups, { foreignKeyContraint: true });
        Users.belongsToMany(models.Groups, { through: "GroupsUsers" });
      }
    }
  });
  return Users;
};
