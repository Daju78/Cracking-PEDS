'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.addColumn('questions', 'explanation',
        {
          type: Sequelize.STRING
        }
      );
  },

  down: function (queryInterface, Sequelize) {
   queryInterface.removeColumn('questions', 'explanation');
  }
};
