"use strict";

module.exports = (sequelize, DataTypes) => {
  var Notification = sequelize.define("Notification", {
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