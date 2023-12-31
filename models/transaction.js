"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.Phone, {
        foreignKey: {
          name: "phoneID",
        },
      });
      Transaction.belongsTo(models.User, {
        foreignKey: {
          name: "userID",
        },
      });
    }
  }
  Transaction.init(
    {
      phoneID: DataTypes.INTEGER,
      userID: DataTypes.INTEGER,
      qty: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
