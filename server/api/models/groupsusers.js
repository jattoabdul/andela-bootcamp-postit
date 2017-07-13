export default(sequelize, DataTypes) => {
  const GroupsUsers = sequelize.define("GroupsUsers", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    isAdmin: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // GroupsUsers.belongsto(models.Groups, {
        //   foreignkey: {
        //     name: "GroupsId",
        //     allowNull: false
        //   }
        // });

        // GroupsUsers.hasMany(models.Users, {
        //   foreignkey: {
        //     name: "UsersId",
        //     allowNull: false
        //   }
        // });
      }
    }
  });
  return GroupsUsers;
};
