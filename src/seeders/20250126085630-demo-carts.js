'use strict';

const { v4: uuidv4 } = require('uuid'); 

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('carts', [
      {
        id: uuidv4(),
        userId: '56becd79-9224-4e65-953e-7edea738516b',  
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        userId: '56becd79-9224-4e65-953e-7edea738516b',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('carts', null, {});
  }
};
