"use strict";

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("MessagesMeta", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msgId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      isRead: {
        allowNull: false,
        type: Sequelize.ENUM("0","1")
      },
      isArchived: {
        allowNull: false,
        type: Sequelize.ENUM("0","1")
      },
      isDeleted: {
        type: Sequelize.ENUM("0","1")
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("MessagesMeta");
  }
};