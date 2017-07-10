"use strict";

module.exports = function (sequelize, DataTypes) {
  var Groups = sequelize.define("Groups", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    isArchived: {
      type: DataTypes.ENUM,
      defaultValue: "0"
    },
    msgCount: DataTypes.INTEGER,
    userCount: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    classMethods: {
      associate: function associate(models) {
        // associations can be defined here
      }
    }
  });
  return Groups;
};