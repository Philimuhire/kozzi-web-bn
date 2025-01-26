'use strict';
const { v4: uuidv4 } = require('uuid'); 

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('categories', [
            {
                id: uuidv4(), 
                name: 'Furniture',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Flowers',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Flower Gardens',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('categories', null, {});
    },
};