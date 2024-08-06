'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Services', [{
        title: 'Дневная няня',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Прогулка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Передержка',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Груминг',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Транспортировка (ветеринар/аэропорт/др.)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Медицинский уход',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Телемост',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      ], {});
  
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Services', null, {});
     
  }
};
