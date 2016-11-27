'use strict';
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define('questions', {
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    option1: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    option2: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    option3: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    option4: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    answer: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    explanation: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        Question.belongsTo(models.topics, { foreignKey: 'topicId'});
      }
    }
  });
  return Question;
};