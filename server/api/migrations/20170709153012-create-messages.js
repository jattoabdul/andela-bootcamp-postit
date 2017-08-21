module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable("Messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      groupId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: true
        }
      },
      text: {
        allowNull: false,
        type: Sequelize.TEXT,
        validate: {
          notEmpty: true
        }
      },
      priority: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: "Normal",
        validate: {
          isIn: [["Normal", "Urgent", "Critical"]]
        }
      },
      isArchived: {
        type: Sequelize.ENUM("0", "1"),
        values: ["0", "1"],
        defaultValue: "0",
        validate: {
          isIn: [["0", "1"]]
        }
      },
      readBy: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
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
