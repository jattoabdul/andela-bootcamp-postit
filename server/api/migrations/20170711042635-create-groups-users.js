module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("GroupsUsers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
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
      isAdmin: {
        type: Sequelize.ENUM("0", "1"),
        defaultValue: "0",
        validate: {
          isIn: [["0", "1"]]
        }
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
    return queryInterface.dropTable("GroupsUsers");
  }
};
