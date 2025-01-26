'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('carts', {
      id: {
        allowNull: false,
        type: Sequelize.UUID,  
        defaultValue: Sequelize.UUIDV4,  
        primaryKey: true,  
      },
      userId: {
        type: Sequelize.UUID,  
        allowNull: false,
        references: {
          model: 'users',  
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

  async down(queryInterface) {
    await queryInterface.dropTable('carts');
  },
};
