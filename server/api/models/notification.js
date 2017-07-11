export default(sequelize, DataTypes) => {
  const Notification = sequelize.define("Notification", {
    msgCount: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    hasSentEmail: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    },
    hasSentSms: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
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
  return Notification;
};
