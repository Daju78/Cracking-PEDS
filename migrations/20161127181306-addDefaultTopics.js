'use strict';

var topics = [{
  name: 'Cardiology & Prevention'
}, {
  name: 'Growth & Development and Guidance of Eruption Dentition'
}, {
  name: 'Pulp Therapy'
}, {
  name: 'Oral Pathology'
}];

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return [
      queryInterface.bulkInsert('Topics', [{
        name: 'Cardiology & Prevention',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Growth & Development and Guidance of Eruption Dentition',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Pulp Therapy',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Oral Pathology',
        createdAt: new Date(),
        updatedAt: new Date()
      }])
    ];
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    return queryInterface.bulkDelete('Topics', null, {});
  }
};