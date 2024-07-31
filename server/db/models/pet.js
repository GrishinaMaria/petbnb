"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    static associate({ User, Booking }) {
      this.belongsTo(User, { foreignKey: 'ownerId' });
      this.hasMany(Booking, { foreignKey: 'petId' });
    }
  }
  Pet.init(
    {
      name: DataTypes.STRING,
      breed: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.TEXT,
      photo: DataTypes.STRING,
      age: DataTypes.INTEGER,
      ownerId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Pet",
    }
  );
  return Pet;
};
