'use strict';

const { v4: uuidv4 } = require('uuid'); 

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('cart_items', [
            {
                id: uuidv4(),
                cartId: '3c2d8894-2b52-4706-9723-fd6460bf29d6', 
                productId: '628e695c-0625-4481-aba9-4607ffd39cde', 
                quantity: 2,
                price: 100.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                cartId: '3c2d8894-2b52-4706-9723-fd6460bf29d6', 
                productId: '927f8938-f1fc-453a-8e52-54e9294c0147', 
                quantity: 1,
                price: 50.0,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('cart_items', null, {});
    },
};
