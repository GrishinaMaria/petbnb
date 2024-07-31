'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate({ PetsitterService }) {
      this.hasMany(PetsitterService, { foreignKey: "serviceId" });
    }
  }
  Service.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Service',
  });
  return Service;
};