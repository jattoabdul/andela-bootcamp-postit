

module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define("Messages", {
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    timeSent: DataTypes.DATE,
    priority: {
      type: DataTypes.STRING,
      defaultValue: "0"
    }
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Messages;
};
