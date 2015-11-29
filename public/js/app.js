'use strict';

angular.module('aqdaApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.router',
  'restangular'
]).config(['$httpProvider', '$urlRouterProvider', '$stateProvider', 'RestangularProvider', function ($httpProvider, $urlRouterProvider, $stateProvider, RestangularProvider) {
  RestangularProvider.setBaseUrl('/');
  $urlRouterProvider.otherwise('/home');
  $stateProvider.state('aqda', {
    url: "",
    templateUrl: "views/main_layout.html",
    abstract: true
  }).state('aqda.home', {
    url: '/home',
    views: {
      "content": {
        templateUrl: "views/home.html",
        controller: 'HomeCtrl'
      }
    }
  });
}]);/*.run(['$state', '$rootScope', '$authValidator', '$location', '$projectAccess', function($state, $rootScope, $authValidator, $location, $projectAccess) {
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      toParams.currentUser = $projectAccess.currentUser();


      if ( toState.name != 'diary.loading' ){
        if ( toParams.currentUser == null ) {
          var stateSend = {};
          stateSend.name = toState.name;
          stateSend.params = toParams;
          event.preventDefault();
          $state.go('diary.loading', { goToState: JSON.stringify(stateSend) } );
          return;
        }
      }
    });
  }]);
*/
