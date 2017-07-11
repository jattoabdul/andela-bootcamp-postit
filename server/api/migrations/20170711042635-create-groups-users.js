'use strict';
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('GroupsUsers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      groupid: {
        type: Sequelize.INTEGER
      },
      userid: {
        type: Sequelize.INTEGER
      },
      joinedOn: {
        type: Sequelize.DATE
      },
      isAdmin: {
        type: Sequelize.ENUM("0", "1")
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
  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('GroupsUsers');
  }
};