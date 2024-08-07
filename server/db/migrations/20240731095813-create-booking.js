"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Bookings", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sitterId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "cascade",
      },
      ownerId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "cascade",
      },
      petId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Pets",
          },
          key: "id",
        },
        allowNull: false,
        onDelete: "cascade",
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      startdate: {
        type: Sequelize.DATE,
      },
      enddate: {
        type: Sequelize.DATE,
      },
      conference: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("Bookings");
  },
};
