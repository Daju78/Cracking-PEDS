var angular = require('angular');

angular.module('fswd.setupQuestions', [])
    .service('QuestionsService', function($http){
        var topicList;
        var topicWithQuesiton; 

        this.retriveTopicList = function(source) {
            //console.log('question service');
            return $http.get('/Questions/topics/'+ source)
                .then(function(respone) {
                    topicList = respone.data;    
                    console.log('topics', topicList);    
                }) ;     
        };

        this.selectedTopic = function(topicId){
            //console.log('service id', topicId);
            return $http.get('/Questions/loadQuesitons/' + topicId)
                .then(function(res){
                    topicWithQuesiton = res.data;
                    console.log('Question', topicWithQuesiton);
                });
        };

        this.updateTopic = function(item) {
            return $http.post('/Questions/updateTopic', item)
                .then(function(res){
                    topicList = res.data;
                });
        };
        
        this.addTopic = function (item) {
            return $http.post('/Questions/addTopic',{name: item})
                .then(function(res) {
                    topicList = res.data ;   
                });
        };

        this.deleteTopic = function (item) {
            return $http.post('/Questions/deleteTopic', item)
                .then(function(res){
                    //console.log(re)
                    topicList = res.data ;
                });
        };

        this.addQuestion = function(question, item) {
            //console.log('question', question);
            //console.log('topic', item);
            return $http.post('/Questions/addQuestion/' + item.id, question)
                .then(function(res){

                });
        };

        this.getTopicList = function(){
            return topicList;
        };

        this.getTopicWithQuestions = function(){
            return topicWithQuesiton;   
        };  
    })
    .controller('QuestionsController', function(QuestionsService, $scope) {
        var vm = this;
        QuestionsService.retriveTopicList('admin');

        vm.updateTopic = function(item) {
            //console.log('update',item);
            QuestionsService.updateTopic(item);
        };

        vm.addTopic = function(item) {
            QuestionsService.addTopic(item);
        };   

        vm.deleteTopic = function(item) {
            QuestionsService.deleteTopic(item);
        };

        vm.addQuestion = function(question, item) {
            QuestionsService.addQuestion(question, item);
        };

        $scope.$watch(function() {
            return QuestionsService.getTopicList();
         }, function(newVal, oldVal) {
            vm.topicList = newVal;
        });
    })    
    .controller('QuizTopicController', function(QuestionsService, $scope){
        var vm = this;
        QuestionsService.retriveTopicList('quiz');

        vm.updateTopic = function(item) {
            //console.log('update',item);
            QuestionsService.updateTopic(item);
        }; 

        vm.selectedTopic = function(topicId){
            //console.log('topic id', topicId);
            QuestionsService.selectedTopic(topicId);
        };

       $scope.$watch(function() {
            return QuestionsService.getTopicList();
         }, function(newVal, oldVal) {
            vm.topicList = newVal;
            //console.log(vm.topicList.name);
        });
    })
    .controller('QuizController', function(QuestionsService, $scope){
        var vm = this;
        vm.qc = 0 ;
        vm.quizList = [];
        vm.result = '';
        vm.resultMessage = '';

        vm.verifyAnswer = function(answer){
            //console.log("answer", answer);
            if(answer === vm.quizList[vm.qc].answer){
                vm.result = 'correct';
                vm.resultMessage = "Your answer is correct." ;
            }else{
                vm.result = 'wrong';
                vm.resultMessage = "Your answer is not correct, here is why: " + vm.quizList[vm.qc].explanation ;
            }
        };

        vm.nextQuestion = function(){
            if (vm.qc + 1 <= vm.quizList.length){
                vm.qc ++;   
            }else {
                vm.qc = 0;
            }
            console.log('count', vm.qc)
            vm.result = '';
            vm.resultMessage = ''; 
        };

        $scope.$watch(function() {
          return QuestionsService.getTopicWithQuestions();  
        }, function(newVal, oldVal){
            vm.topicWithQuesiton = newVal;
            if (vm.topicWithQuesiton){
                vm.obj = JSON.parse(JSON.stringify(vm.topicWithQuesiton));
                //console.log(vm.obj.questions);
                vm.quizList = vm.obj.questions;
                //console.log(vm.quizList);
            }
        });
    })
    .component('takeQuizComponent',{
        controller: 'QuizController',
        controllerAs: 'vm',
        templateUrl: '/partials/quizPartial'
    });

module.exports = angular.module('fswd.setupQuestions');