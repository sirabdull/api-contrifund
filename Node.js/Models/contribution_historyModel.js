const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Contribution_history = sequelize.define("contribution_history", {
  sn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  contribution_history_id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  contribution_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  transaction_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  history_type: {
    type: DataTypes.ENUM,
    values: ["deposit", "withdrawal"],
    allowNull: false,
  },
  
  history_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  
});
Contribution_history.removeAttribute(["id"]);
module.exports = Contribution_history;
