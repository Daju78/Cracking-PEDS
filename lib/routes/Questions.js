var express = require('express'),
  router = express.Router(),
  Topic = require('../../models').Topics,
  Question = require('../../models').questions;

  function authChecker(req, res, next) {
    if (req.session.user_name === 'Admin') {
        next();
    } else {
       res.send('Page not found', 404);
    }
  }

  //topic.questions.[fields]
  router.get('/topics/:sourcePath', function(req, res) {
    Topic.findAll()
    .then(function(topics){
      //console.log('topics', topics);
      res.format({
        html: function(){
          res.render('users/' + req.params.sourcePath, { topics: topics});
        },
        json: function() {
          res.json(topics);
        }
      });
    });
  });

  router.get('/loadQuesitons/:topicId', function(req, res){
    Topic.findOne({
      include: [Question],
      where: {id: req.params.topicId} 
    })
    .then(function(topic){
      //console.log('topic and questions', topic.questions);
      res.format({
          html: function(){
            res.render('users/quiz', {topic: topic});
          },
          json: function () {
            res.json(topic);
          }  
      });  
    });
  });

  router.use(authChecker);

  router.post('/updateTopic', function(req, res){
    //console.log(req.body);
    Topic.update(
      {
        name: req.body.name
      },
      {
        where : {id: req.body.id}
      })
      .then(function(topic){
        res.redirect("/Questions/topics");
      });
  });
  router.post('/deleteTopic', function(req, res){
    Topic.destroy(
      {
        where : {id: req.body.id}
      })
      .then(function(){
        res.redirect("/Questions/topics");
      });
  });

  router.post('/addTopic', function(req, res){
    Topic.create({ name: req.body.name })
      .then(function(topic){
        res.redirect("/Questions/topics");
      });
  });

  router.post('/addQuestion/:topicId', function(req, res){
    //console.log(req.body);
    Question.create({
      description: req.body.description,
      option1: req.body.option1,
      option2: req.body.option2,
      option3: req.body.option3,
      option4: req.body.option4,
      answer: req.body.answer,
      topicId: req.params.topicId,
      explanation: req.body.explanation
    })
    .then(function(question){
      res.redirect("/Questions/topics");
    });
  });

  module.exports = router;