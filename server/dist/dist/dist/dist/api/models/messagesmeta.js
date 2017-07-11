"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var MessagesMeta = sequelize.define("MessagesMeta", {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    isRead: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
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
    freezeTableName: true,
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return MessagesMeta;
};