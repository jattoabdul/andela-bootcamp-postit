

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("Notifications", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      msgCount: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hasSentEmail: {
        allowNull: false,
        type: Sequelize.ENUM("0", "1")
      },
      hasSentSms: {
        allowNull: false,
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
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable("Notifications");
  }
};
