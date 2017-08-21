export default (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
        // is: ["[a-z]", "i"]alphanumeric
      }
    },
    priority: {
      type: DataTypes.STRING,
      defaultValue: "Normal",
      allowNull: false,
      validate: {
        isIn: [["Normal", "Urgent", "Critical"]]
      }
    },
    isArchived: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0",
      validate: {
        isIn: [["0", "1"]]
      }
    },
    readBy: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    }
  });

  // associations can be defined here
  Messages.associate = (models) => {
    Messages.belongsTo(models.Users, {
      as: "user",
      foreignKey: "userId"
    });

    Messages.belongsTo(models.Groups, {
      as: "group",
      foreignKey: "groupId"
    });
  };
  return Messages;
};
