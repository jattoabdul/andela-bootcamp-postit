export default(sequelize, DataTypes) => {
  const MessagesMeta = sequelize.define("MessagesMeta", {
    msgId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    isRead: DataTypes.ENUM,
    isArchived: DataTypes.ENUM,
    isDeleted: DataTypes.ENUM
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return MessagesMeta;
};
