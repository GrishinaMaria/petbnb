"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PetsitterService extends Model {
    static associate({ User, Service }) {
      this.belongsTo(User, { foreignKey: "sitterId", as: "sitter"  });
      this.belongsTo(Service, { foreignKey: "serviceId", as: "service" });
    }
  }
  PetsitterService.init(
    {
      sitterId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      petType: DataTypes.STRING, 
    },
    {
      sequelize,
      modelName: "PetsitterService",
    }
  );
  return PetsitterService;
};
