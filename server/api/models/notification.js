

module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    msgCount: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    hasSentEmail: DataTypes.ENUM,
    hasSentSms: DataTypes.ENUM
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Notification;
};
