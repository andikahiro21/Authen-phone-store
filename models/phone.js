"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Phone.hasMany(models.Transaction, {
        foreignKey: {
          name: "phoneID",
        },
        onDelete: "CASCADE",
      });

      Phone.belongsTo(models.Brand, {
        foreignKey: {
          name: "brandID",
        },
      });
    }
  }
  Phone.init(
    {
      name: DataTypes.STRING,
      brandID: DataTypes.INTEGER,
      spesification: DataTypes.TEXT,
      image: DataTypes.STRING,
      price: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Phone",
    }
  );
  return Phone;
};
