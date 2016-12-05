'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.addColumn('questions', 'createdAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
      queryInterface.addColumn('questions', 'updatedAt',
        {
          allowNull: false,
          type: Sequelize.DATE
        }
      ),
    ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return [
      queryInterface.removeColumn('questions', 'createdAt'),
      queryInterface.removeColumn('questions', 'updatedAt'),
    ];
  }
};
