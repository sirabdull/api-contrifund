const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Contribution_plan = sequelize.define("contribution_plan", {
  sn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  contribution_plan_id: {
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
    primaryKey: true,
  },
  plan_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contribution_amount: {
    type: DataTypes.DOUBLE(10, 2),
    allowNull: false,
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },

  duration: {
    type: DataTypes.ENUM,
    values: ["yearly", "monthly"],
    allowNull: false,
  },
});
Contribution_plan.removeAttribute(["id"]);
module.exports = Contribution_plan;
