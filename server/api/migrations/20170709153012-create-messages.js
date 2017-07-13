

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      priority: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "0"
      },
      isArchived: {
        type: Sequelize.ENUM("0", "1"),
        values: ["0", "1"],
        defaultValue: "0"
      },
      isDeleted: {
        type: Sequelize.ENUM("0", "1"),
        values: ["0", "1"],
        defaultValue: "0"
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
    return queryInterface.dropTable("Messages");
  }
};
