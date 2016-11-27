'use strict';

var bcrypt = require('bcrypt');

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      set: function(val) {
        this.setDataValue('password', bcrypt.hashSync(val, 8));
      },
      validate: {
        notIn: [['password']],
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    firstName: {
      type: DataTypes.STRING,
      validate: {
        is: /^[A-Z]'?[- &a-zA-Z]+/
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
          is: /^[A-Z]'?[- &a-zA-Z]+/
      }
    },
    trainingProgram: {
      type: DataTypes.STRING
    },
    yearInTraining: {
      type: DataTypes.STRING
    }   
  }, {
    instanceMethods: {
      isValidPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    },
    classMethods: {
      associate: function(models) {
        //User.hasMany(models.Result);
      }
    },
    validate: {

    }
  });
  return User;
};
