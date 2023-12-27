const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Transaction = sequelize.define("transaction", {
  transaction_id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  contribution_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  transaction_status: {
    type: DataTypes.ENUM,
    values: ["pending", "successfull", "failed"],
    allowNull: false,
    defaultValue: "pending",
  },
  transaction_amount: {
    type: DataTypes.DOUBLE(10, 2),
    allowNull: false,
  },
  payment_method: {
    type: DataTypes.ENUM,
    values: ["credit card", "bank transfer"],
    allowNull: false,
  },
});
Transaction.removeAttribute(["id"]);
module.exports = Transaction;
