'use strict';

const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid'); 

module.exports = {
  up: async (queryInterface) => {
    const reviews = [
      {
        id: uuidv4(),
        productId: '302428af-d926-442b-a464-5f34462d1ff6',
        userId: 'b64f59e6-d4e8-4cd6-9c2e-4864fc8a483f', 
        rating: 5,
        comment: 'Excellent product! Highly recommend.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        productId: '628e695c-0625-4481-aba9-4607ffd39cde', 
        userId: 'b64f59e6-d4e8-4cd6-9c2e-4864fc8a483f', 
        rating: 4,
        comment: 'Very good quality, but a bit expensive.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        productId: '927f8938-f1fc-453a-8e52-54e9294c0147',
        userId: '21d4cef5-14e6-447a-9435-813ebbc878f2', 
        comment: 'Average product, nothing special.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('reviews', reviews, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('reviews', null, {});
  },
};