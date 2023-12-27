const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Host = sequelize.define('host', {
 sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
host_id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
 user_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
 name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
   email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
  },

  hasHostingPrevilage: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  occupation : {
    type: DataTypes.STRING,
    allowNull: false,
  },
}
)
Host.removeAttribute(["id"]);
module.exports = Host;