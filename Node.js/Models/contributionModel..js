
const sequelize = require('../config/db');
const { DataTypes } = require('sequelize');

const Contribution = sequelize.define('contributions', {
 sn:{
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
contribution_id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
 user_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  host_id:{
    type: DataTypes.STRING,
    allowNull: false,
  },
contribution_type: {
        type: DataTypes.ENUM,
        values: ['daily', 'weekly', 'monthly'],
        allowNull: false,

    },
contribution_amount:{
        type: DataTypes.DOUBLE(10,2),
        allowNull: false,
    },
contribution_description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    contribution_title:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
members_completed_status: {
        type: DataTypes.ENUM,
        values: ['is_ongoing', 'is_completed'],
        allowNull: false,
    },
contribution_date:{
    type: DataTypes.DATEONLY,
    allowNull: false,

},
contribution_status: {
        type: DataTypes.ENUM,
        values: ['paid', 'unpaid'],
        allowNull: false,

    },
contribution_visibility: {
        type: DataTypes.ENUM,
        values: ['private', 'public'],
        allowNull: false,

    }
},
)
Contribution.removeAttribute(['id'])
module.exports = Contribution
