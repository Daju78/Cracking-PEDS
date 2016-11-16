'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return [
      queryInterface.addColumn('Users', 'firstName',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn('Users', 'lastName',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn('Users', 'program',
        {
          type: Sequelize.STRING,
          allowNull: false
        }
      ),
      queryInterface.addColumn('Users', 'yearInTraining',
        {
          type: Sequelize.STRING(1),
          allowNull: false
        }
      ),
    ];
  },

  down: function (queryInterface, Sequelize) {
    return [
      queryInterface.removeColumn('Users', 'firstName'),
      queryInterface.removeColumn('Users', 'lastName'),
      queryInterface.removeColumn('Users', 'program'),
      queryInterface.removeColumn('Users', 'yearInTraining'),
    ];
  }
};
