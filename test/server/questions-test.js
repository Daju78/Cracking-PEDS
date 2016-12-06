'use strict';

// load the common test setup code
require('../setup-test');

// code to test
var app = require('../../lib/app');

// libraries
var request = require('supertest-as-promised').agent,
  agent;

var Topic = require('../../models').Topics;  
var Question = require('../../models').questions;
var User = require('../../models').User;

describe('Topics and Question', function() {
  beforeEach(function() {
    agent = request(app);
  });

  after(function() {
    return User.truncate()
      .then(function(){
        return Topic.truncate({ cascade: true });
      });
    });
  describe('Configure screen ', function(){
    //var existingUser;
    before(function(){
       return User.bulkCreate([{ username: 'Admin', password: 'TheirPassword' },
                           { username: 'test1', password:'otherPassword'}]);
    });

    after(function(){
      return User.truncate();
    });
    it('should have a configure page', function() {
      return agent
        .post('/users/login')
        .type('form')
        .send({
          username: 'Admin',
          password: 'TheirPassword'
        })
        .expect(302)
        .expect('Location', '/')
        .then(function(){
          return agent
            .get('/')
            .expect(200, /Hello Admin!/)
            .then(function(){
              return agent
              .get('/users/admin')
              .expect(200, /Configure Questions/);
            });
        });     
    });

    it('should not allow non admin user access configure page', function(){
      return agent
        .post('/users/login')
        .type('form')
        .send({
          username: 'test1',
          password: 'otherPassword'
        })
        .expect(302)
        .expect('Location', '/')
        .then(function(){
          return agent
            .get('/')
            .expect(200, /Hello test1!/)
            .then(function(){
              return agent
              .get('/users/admin')
              .expect(404);
            });
        });
    });

  });

  describe('configure topics', function(){
    before(function(){
       return User.create({ username: 'Admin', password: 'TheirPassword' })
        .then(function(User){
          return Topic.bulkCreate([
            { name: 'test topic 1',
              createdAt: new Date(),
              updatedAt: new Date()},
            { name: 'test topic 2',
              createdAt: new Date(),
              updatedAt: new Date()}
          ]);
        });                    
    });

    after(function(){
      return User.truncate()
      .then(function(){
        return Topic.truncate({ cascade: true });
      });
    });

    it('should delte the topic', function() {
      return agent
        .post('/users/login')
        .type('form')
        .send({
          username: 'Admin',
          password: 'TheirPassword'
        })
        .expect(302)
        .expect('Location', '/')
        .then(function(){
          return agent
            .get('/')
            .expect(200, /Hello Admin!/)
            .then(function(){
              return agent
              .get('/users/admin')
              .expect(200, /Configure Questions/);
            });
        });     
    });

  });

});