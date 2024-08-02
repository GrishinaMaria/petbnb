'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookedService extends Model {
    static associate({ Booking, Service }) {
      this.belongsTo(Booking, { foreignKey: 'bookingId' });
      this.belongsTo(Service, { foreignKey: 'serviceId' });
    }
  }
  BookedService.init({
    bookingId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookedService',
  });
  return BookedService;
};