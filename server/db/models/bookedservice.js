'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BookedService extends Model {
    static associate({ Booking, PetsitterService }) {
      this.belongsTo(Booking, { foreignKey: 'bookingId' });
      this.belongsTo(PetsitterService, { foreignKey: 'petsitterserviceId' });
    }
  }
  BookedService.init({
    bookingId: DataTypes.INTEGER,
    petsitterserviceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BookedService',
  });
  return BookedService;
};