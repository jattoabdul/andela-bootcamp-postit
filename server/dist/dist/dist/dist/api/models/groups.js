"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (sequelize, DataTypes) {
  var Groups = sequelize.define("Groups", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    isArchived: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
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

/*
// recreate al my models and migration files after deleting the current ones
// sequelize model:create --name Group --attributes
// name:string,desc:text,isArchived:enum,msgCount:integer,userCount:integer add
// optional -U postgres flag
*/