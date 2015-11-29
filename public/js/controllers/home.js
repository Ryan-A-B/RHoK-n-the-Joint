'use strict';

angular.module('aqdaApp')
  .controller('HomeCtrl', ['$scope', 'Restangular', '$state', function ($scope, Restangular, $state) {

    $scope.results = null;

    $scope.answers = {

    };

    var baseResponses = Restangular.all('responses');

    $scope.buildSubmission = function(){
      console.log($scope.answers);
      var submission = [
        {
          "id":1,
          "description":"Age",
          "answers":[]
        },
        {
          "id":2,
          "description":"Sex",
          "answers":[]
        }
      ];
      //break age and sex into separate questions
      submission[0].answers.push({"id":null, "value": $scope.answers.age});
      var sexAnswer = null;
      if ( $scope.answers.sex == 'Male' ){
        sexAnswer = {"id":2, "value":"male"};
      }else{
        sexAnswer = {"id":1, "value":"female"};
      }
      submission[1].answers.push(sexAnswer);
      //now skip over the first question which is the ageSex question and
      //build the submission JSON
      for ( var i = 1; i < $scope.questions.length; i++ ){
        var question = $scope.questions[i];
        var answer = $scope.answers[question.id];
        var submissionAnswer = {
          "id":question.id,
          "description":question.description,
          "answers":[]
        };
        if (question.type == "yesNo"){
          if ( answer.noSelected ){
            //do nothing
          }else if ( answer.yesSelected ){
            //check if theres a sub question - if there is, use that answer
            if ( question.subQuestion != null ){
              submissionAnswer.answers = answer.detailedAnswers;
            }else{
              submissionAnswer.push({"id":"0", "value":"yes"});
            }
          }
        }else if ( question.type == 'select' ){
          submissionAnswer.answers = answer.detailedAnswers;
        }else if ( question.type == 'multiSelect' ){
          submissionAnswer.answers = answer.detailedAnswers;
        }
        submission.push(submissionAnswer);
      }
      var fullSubmission = {"questions":submission};
      console.log(JSON.stringify(fullSubmission));
      baseResponses.post(fullSubmission).then(function(results){
        $scope.results = results;
      }, function(err){
        alert("Error encountered - Faking it");
        console.log(err);
        $scope.results = {
          type: 'Mechanical',
          strains: [
            {url:"https://www.google.com", name: "Rheumatoid Arthritis"},
            {url:"https://www.google.com", name: "Psoriatic Arthritis"},
            {url:"https://www.google.com", name: "Fibromyalgia"}
          ]
        };
      });
    }

    $scope.completeSurvey = function(){
      $scope.buildSubmission();
      for (var i = 0; i < $scope.questions.length; i++ ){
        var q = $scope.questions[i];
        q.active = false;
      }
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

    $scope.indexOfQuestion = function(q){
      for ( var i = 0; i < $scope.questions.length; i++ ){
        var question = $scope.questions[i];
        if ( question.id == q.id ){
          return i;
        }
      }
      return null;
    }

    $scope.moveToQuestionWithId = function(id){
      //the user can only move to a question if all the questions before it
      //have valid answers
      var targetQuestion = null;
      var allValid = true;
      for ( var i = 0; i < $scope.questions.length; i++ ){
        var question = $scope.questions[i];
        if ( question.id == id ){
          //found the question - check everything before it
          for ( var j = 0; j < i; j++ ){
            var otherQuestion = $scope.questions[j];
            allValid = $scope.answerValid(otherQuestion);
            if ( !allValid ){
              break;
            }
          }
        }
      }
      if ( !allValid ){
        return;
      }
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
        "description":"Onset of symptoms",
        "type":"select",
        "options":[
          {"id":1, "value":"< 1 Month"},
          {"id":2, "value":"> 1 Month"},
          {"id":3, "value":"> 3 Months"}
        ],
        "section":"History"
      },
      {
        "id":4,
        "description":"Regularity of symptoms",
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
            {"id":1, "value":"< 30 mins"},
            {"id":2, "value":"> 30 mins"},
            {"id":3, "value":"30-60 mins"},
            {"id":4, "value":"> 60 mins"}
          ]
        },
        "active":false,
        "section":"History"
      },
      {
        "id":6,
        "description":"Articulations of the upper limb",
        "type":"yesNo",
        "subQuestion":{
          "type":"multiSelect",
          "options":[
            {"id":1, "value":"Elbow joint articulations"},
            {"id":2, "value":"Radio ulnar articulations"},
            {"id":3, "value":"Carpometacarpal articulations"},
            {"id":4, "value":"Metacarpophalangeal articulations"},
            {"id":5, "value":"Articulations of the digits"}
          ]
        },
        "active":false,
        "section":"Joints/Symptoms"
      }
    ];
}]);
