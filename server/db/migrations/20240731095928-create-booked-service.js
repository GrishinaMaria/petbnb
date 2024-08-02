"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("BookedServices", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      bookingId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Bookings",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "cascade",
      },
      serviceId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Services",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "cascade", 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("BookedServices");
  },
};
