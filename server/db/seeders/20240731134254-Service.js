'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Services', [{
        title: 'прогулка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'кормление',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'игра',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Services', null, {});
     
  }
};
