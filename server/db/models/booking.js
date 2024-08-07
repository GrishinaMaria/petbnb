'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate({ User, Pet, BookedService }) {
      this.belongsTo(User, { foreignKey: 'ownerId', as: 'owner' });
      this.belongsTo(User, { foreignKey: 'sitterId', as: 'sitter' });
      this.belongsTo(Pet, { foreignKey: 'petId', as: 'pet' });
      this.hasMany(BookedService, { foreignKey: 'bookingId', as: 'bookedServices' });
    }
  }
  Booking.init({
    sitterId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
    petId: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    startdate: DataTypes.DATE,
    enddate: DataTypes.DATE,
    conference: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};