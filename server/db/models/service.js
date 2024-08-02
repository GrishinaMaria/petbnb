'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Service extends Model {
    static associate({ PetsitterService, BookedService }) {
      this.hasMany(PetsitterService, { foreignKey: "serviceId" });
      this.hasMany(BookedService, { foreignKey: "serviceId", as: "bookedServices"  });

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