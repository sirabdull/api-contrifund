const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Chat = sequelize.define("chats", {
  message_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  
  body : {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Chat.removeAttribute(["id"]);

module.exports = Chat;
