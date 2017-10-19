module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.changeColumn(
      'Groups',
      'name',
      {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        },
        unique: true
      }
    );
  },

  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('Groups');
  }
};
