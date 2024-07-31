"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Pet, PetsitterService, Booking }) {
      this.hasMany(Pet, { foreignKey: "ownerId" });
      this.hasMany(PetsitterService, {
        foreignKey: "sitterId",
        as: "availableServices",
      });
      this.hasMany(Booking, { foreignKey: "ownerId", as: "bookingsOfOwner" });
      this.hasMany(Booking, { foreignKey: "sitterId", as: "bookingsOfSitter" });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      description: DataTypes.TEXT,
      experience: DataTypes.INTEGER,
      photo: DataTypes.STRING,
      geoX: DataTypes.DOUBLE,
      geoY: DataTypes.DOUBLE,
      city: DataTypes.STRING,
      phone: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
