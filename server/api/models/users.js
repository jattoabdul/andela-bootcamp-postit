export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    fullName: {
      allowNull: true,
      type: DataTypes.STRING
    },
    lastLogin: {
      allowNull: true,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn('NOW')
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    phoneNumber: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        not: ['[a-z]', 'i']
      }
    }
  });
  Users.associate = (models) => {
    Users.belongsToMany(models.Groups, {
      through: 'GroupsUsers',
      as: 'groups',
      foreignKey: 'userId'
    });

    Users.hasMany(models.Messages, {
      as: 'messages',
      foreignKey: 'userId'
    });
  };
  return Users;
};
