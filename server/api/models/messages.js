export default(sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    priority: {
      type: DataTypes.STRING,
      defaultValue: "0"
    },
    isArchived: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    },
    isDeleted: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        // Messages.belongTo(models.Users, {
        //   foreignKey: {
        //     name: userId,
        //     allowNull: false
        //   }
        // });

        // Messages.belongTo(models.Groups, {
        //   foreignKey: {
        //     name: groupId,
        //     allowNull: false
        //   }
        // });
      }
    }
  });
  return Messages;
};
