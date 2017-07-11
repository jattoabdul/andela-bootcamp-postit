export default(sequelize, DataTypes) {
  var GroupsUsers = sequelize.define("GroupsUsers", {
    groupid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    joinedOn: DataTypes.DATE,
    isAdmin: DataTypes.ENUM
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return GroupsUsers;
};