module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable('Groups', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: true
        }
      },
      desc: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      isArchived: {
        allowNull: false,
        type: Sequelize.ENUM('0', '1'),
        defaultValue: '0',
        validate: {
          isIn: [['0', '1']]
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
    return queryInterface.dropTable('Groups');
  }
};
