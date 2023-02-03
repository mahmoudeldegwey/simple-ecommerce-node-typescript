'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('products','quantity', {
      
      type: Sequelize.INTEGER
      
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('products','quantity');
  }
};