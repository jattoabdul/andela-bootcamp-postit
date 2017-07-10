"use strict";

module.exports = function (sequelize, DataTypes) {
  var MessagesMeta = sequelize.define('MessagesMeta', {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    isRead: DataTypes.ENUM,
    isArchived: DataTypes.ENUM,
    isDeleted: DataTypes.ENUM
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