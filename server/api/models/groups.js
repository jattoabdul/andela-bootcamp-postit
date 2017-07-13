export default(sequelize, DataTypes) => {
  const Groups = sequelize.define("Groups", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    isArchived: {
      type: DataTypes.ENUM,
      values: ["0", "1"],
      defaultValue: "0"
    }
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Groups.belongsTo(models.Users, { foreignKeyContraint: true });
        Groups.belongsToMany(models.Users, { through: "GroupsUsers" });
      }
    }
  });
  return Groups;
};

/*
// recreate al my models and migration files after deleting the current ones
// sequelize model:create --name Group --attributes
// name:string,desc:text,isArchived:enum,msgCount:integer,userCount:integer add
// optional -U postgres flag
*/
