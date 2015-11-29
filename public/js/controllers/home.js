'use strict';

angular.module('aqdaApp')
  .controller('HomeCtrl', ['$scope', 'Restangular', '$state', function ($scope, Restangular, $state) {

    $scope.results = null;

    $scope.answers = {

    };

    $scope.completeSurvey = function(){
      for (var i = 0; i < $scope.questions.length; i++ ){
        var q = $scope.questions[i];
        q.active = false;
      }
      $scope.results = {
        type: 'Mechanical',
        strains: [
          {url:"https://www.google.com", name: "Rheumatoid Arthritis"},
          {url:"https://www.google.com", name: "Psoriatic Arthritis"},
          {url:"https://www.google.com", name: "Fibromyalgia"}
        ]
      };
    }

    $scope.yesNoSelected = function(question, result){
      if ( $scope.answers[question.id] == null ){
        $scope.answers[question.id] = {};
      }
      $scope.answers[question.id].yesSelected = false;
      $scope.answers[question.id].noSelected = false;
      if ( result ){
        $scope.answers[question.id].yesSelected = true;
      }else{
        $scope.answers[question.id].noSelected = true;
      }
    }

    $scope.detailedAnswerSelected = function(question, option){
      if ( $scope.answers[question.id] == null ){
        $scope.answers[question.id] = {};
      }
      if ( $scope.answers[question.id].detailedAnswers == null ){
        $scope.answers[question.id].detailedAnswers = [];
      }
      var answer = $scope.answers[question.id];
      if (( question.type == "select" || (question.subQuestion != null && question.subQuestion.type == "select"))){
        //can only have one
        if ( answer.detailedAnswers.length > 0 ){
          answer.detailedAnswers.splice(0, 1);
        }
        answer.detailedAnswers.push(option);
      }else if (( question.type == "multiSelect" || (question.subQuestion != null && question.subQuestion.type == "multiSelect"))){
        var existingIndex = answer.detailedAnswers.indexOf(option);
        if ( existingIndex != -1 ){
          answer.detailedAnswers.splice(existingIndex, 1);
        }else{
          answer.detailedAnswers.push(option);
        }
      }

    }

    $scope.moveToQuestionWithId = function(id){
      var targetQuestion = null;
      for ( var i = 0; i < $scope.questions.length; i++ ){
        var question = $scope.questions[i];
        if ( question.id == id ){
          question.active = true;
        }else{
          question.active = false;
        }
      }
    }

    $scope.optionSelected = function(question, option){
      if ( $scope.answers[question.id] == null ){
        return false;
      }
      if ( $scope.answers[question.id].detailedAnswers == null ){
        return false;
      }
      if ( $scope.answers[question.id].detailedAnswers.indexOf(option) != -1 ){
        return true;
      }
      return false;
    }

    $scope.setSex = function(gender){
      $scope.answers.sex = gender;
    }

    $scope.questionAfterQuestion = function(question){
      var found = false;
      for ( var i = 0; i < $scope.questions.length; i++ ){
        var currentQuestion = $scope.questions[i];
        if ( currentQuestion.id == question.id ){
          found = true;
        }else if ( found ){
          return currentQuestion;
        }
      }
      return null;
    }

    $scope.questionsExistAfterQuestion = function(q){
      var exists = $scope.questionAfterQuestion(q) != null;
      console.log(q, exists);
      return exists;
    }

    $scope.moveToNextQuestionFromQuestion = function(q){
      var next = $scope.questionAfterQuestion(q);
      if ( next != null ){
        $scope.moveToQuestionWithId(next.id);
      }
    }

    $scope.answerValid = function(question){
      if ( question.type == 'ageSex'){
        if (( $scope.answers.age != null ) && ( $scope.answers.sex != null )){
          return true;
        }
      }
      if ( $scope.answers[question.id] == null ){
        return false;
      }
      var answer = $scope.answers[question.id];
      if ( question.type == 'yesNo' ){
        if ( answer.noSelected ){
          return true;
        }
        if ( answer.yesSelected ) {
          if ( question.subQuestion != null ){
            if (( answer.detailedAnswers != null ) && (answer.detailedAnswers.length > 0)){
              return true;
            }
          }else{
            return true;
          }
        }
      }
      if (( question.type == 'select' ) || ( question.type == 'select' )){
        if (( answer.detailedAnswers != null ) && ( answer.detailedAnswers.length > 0 )){
          return true;
        }
      }
      return false;
    }

    $scope.surveyValid = function(){
      for ( var i = 0; i < $scope.questions.length; i++ ){
        var q = $scope.questions[i];
        if ( !$scope.answerValid(q) ){
          return false;
        }
      }
      return true;
    }

    $scope.questions = [
      {
        "id":1,
        "description":"",
        "type":"ageSex",
        "active":true,
        "section":"History"
      },
      {
        "id":3,
        "description":"Onset of Symptoms",
        "type":"select",
        "options":[
          {"id":1, "value":"<1 Month"},
          {"id":2, "value":">1 Month"},
          {"id":3, "value":">3 Months"}
        ],
        "section":"History"
      },
      {
        "id":4,
        "description":"Regularity of Symptoms",
        "type":"select",
        "options":[
          {"id":1, "value":"Persistent"},
          {"id":2, "value":"Intermittent"}
        ],
        "section":"History"
      },
      {
        "id":5,
        "description":"Morning pain or stiffness",
        "type":"yesNo",
        "subQuestionTrigger":"yes",
        "subQuestion":{
          "description":"How long does the pain last",
          "type":"select",
          "options":[
            {"id":1, "value":"<30 min"},
            {"id":2, "value":">30 min"},
            {"id":3, "value":"30-60 min"},
            {"id":4, "value":">60 min"}
          ]
        },
        "active":false,
        "section":"History"
      },
      {
        "id":6,
        "description":"Articulations of the head, neck and cervical and thoracic spine",
        "type":"yesNo",
        "subQuestion":{
          "type":"multiSelect",
          "options":[
            {"id":1, "value":"Articulations of the mandible"},
            {"id":2, "value":"Articulations of the manubrium and body of the sternum"},
            {"id":3, "value":"Sternoclavicular articulation"},
            {"id":4, "value":"Acromioclavicular articulations"},
            {"id":5, "value":"Humeral articulation"}
          ]
        },
        "active":false,
        "section":"Joints/Symptoms"
      }
    ];
}]);
