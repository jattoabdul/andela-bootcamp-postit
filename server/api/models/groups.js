export default (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    desc: {
      allowNull: true,
      type: DataTypes.TEXT
    },
    isArchived: {
      type: DataTypes.ENUM,
      values: ['0', '1'],
      defaultValue: '0',
      validate: {
        isIn: [['0', '1']]
      }
    }
  });
  Groups.associate = (models) => {
    Groups.belongsToMany(models.Users, {
      through: 'GroupsUsers',
      as: 'users',
      foreignKey: 'groupId'
    });
  };
  return Groups;
};
