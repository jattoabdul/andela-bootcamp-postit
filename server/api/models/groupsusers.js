export default (sequelize, DataTypes) => {
  const GroupsUsers = sequelize.define("GroupsUsers", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "id"
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Groups",
        key: "id"
      }
    },
    isAdmin: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0",
      validate: {
        isIn: [["0", "1"]]
      }
    }
  });

  // associations can be defined here
  // GroupsUsers.belongsto(models.Groups, {
  //   foreignkey: {
  //     name: "groupId",
  //     allowNull: false
  //   }
  // });

  // GroupsUsers.hasMany(models.Users, {
  //   foreignkey: {
  //     name: "userId",
  //     allowNull: false
  //   }
  // });

  return GroupsUsers;
};
