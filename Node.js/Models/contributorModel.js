const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Contributor = sequelize.define("contributors", {
  sn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  contributor_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  host_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contribution_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contributor_status: {
    type: DataTypes.ENUM,
    values: ["active", "inactive"],
    allowNull: false,
  },
  
});
Contributor.removeAttribute(["id"]);
module.exports = Contributor;
