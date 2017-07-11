"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Notification = sequelize.define("Notification", {
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
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Notification;
};