'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('products', {
            id: {
                type: Sequelize.UUID,
                defaultValue: Sequelize.UUIDV4, 
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            categoryId: {
                type: Sequelize.UUID, 
                allowNull: false,
                references: {
                    model: 'categories', 
                    key: 'id',
                },
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
            imageUrl: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            quantity: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
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

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('products');
    },
};