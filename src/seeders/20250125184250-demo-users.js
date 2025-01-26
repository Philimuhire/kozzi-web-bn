'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 

module.exports = {
  up: async (queryInterface) => {
    const users = [
      {
        id: uuidv4(), 
        username: 'admin',
        email: 'admin@example.com',
        password: await bcrypt.hash('admin123', 10), 
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: 'buyer1',
        email: 'buyer1@example.com',
        password: await bcrypt.hash('buyer123', 10),
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: 'buyer2',
        email: 'buyer2@example.com',
        password: await bcrypt.hash('buyer123', 10), 
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: 'buyer3',
        email: 'buyer3@example.com',
        password: await bcrypt.hash('buyer123', 10), 
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        username: 'buyer4',
        email: 'buyer4@example.com',
        password: await bcrypt.hash('buyer123', 10), 
        role: 'buyer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users', null, {});
  },
};
