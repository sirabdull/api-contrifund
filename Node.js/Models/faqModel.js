const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FAQ = sequelize.define("FAQ", {
  sn: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  FAQ_id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  FAQ_question: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  FAQ_answer: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

});

module.exports = FAQ;
