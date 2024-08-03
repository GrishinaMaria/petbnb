'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

      await queryInterface.bulkInsert('Services', [{
        title: 'Погулять',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Покормить',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Поиграть',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Помощь в транспортировке (ветеринар/аэропорт/др.)',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Груминг',
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
