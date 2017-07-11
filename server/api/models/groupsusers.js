export default(sequelize, DataTypes) => {
  const GroupsUsers = sequelize.define("GroupsUsers", {
    groupid: DataTypes.INTEGER,
    userid: DataTypes.INTEGER,
    joinedOn: DataTypes.DATE,
    isAdmin: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return GroupsUsers;
};
