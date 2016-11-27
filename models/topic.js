'use strict';
module.exports = function(sequelize, DataTypes) {
  var Topic = sequelize.define('topics', {
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    } 
  }, {
    classMethods: {
      associate: function(models) {
        Topic.hasMany(models.questions, { foreignKey: 'topicId' });
      }
    }
  });
  return Topic;
};