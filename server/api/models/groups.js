export default(sequelize, DataTypes) => {
  const Groups = sequelize.define("Groups", {
    name: DataTypes.STRING,
    desc: DataTypes.TEXT,
    isArchived: {
      type: DataTypes.ENUM,
      defaultValue: "0"
    },
    msgCount: DataTypes.INTEGER,
    userCount: DataTypes.INTEGER
  }, {
    freezeTableName: true,
    classMethods: {
      associate: (models) => {
        // associations can be defined here
      }
    }
  });
  return Groups;
};
// recreate al my models and migration files after deleting the current ones
// sequelize model:create --name Group --attributes
// name:string,desc:text,isArchived:enum,msgCount:integer,userCount:integer add
// optional -U postgres flag