'use strict';
const { v4: uuidv4 } = require('uuid'); 

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('products', [
            {
                id: uuidv4(), 
                name: 'Wooden Chair',
                categoryId: '24d11629-32fb-4bb7-8419-64bb5aae245c', 
                price: 49.99,
                description: 'A comfortable wooden chair.',
                imageUrl: 'https://example.com/images/wooden-chair.jpg',
                quantity: 100,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Rose Bouquet',
                categoryId: '32caad68-4466-4758-b670-bcfee663be6d', 
                price: 29.99,
                description: 'A beautiful bouquet of roses.',
                imageUrl: 'https://example.com/images/rose-bouquet.jpg',
                quantity: 50,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                id: uuidv4(),
                name: 'Garden Flower Set',
                categoryId: '5a4ee0d5-fbae-41a6-8914-464077250512', 
                price: 99.99,
                description: 'A set of flowers for your garden.',
                imageUrl: 'https://example.com/images/garden-flower-set.jpg',
                quantity: 30,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('products', null, {});
    },
};