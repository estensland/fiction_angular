'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.home',
  'myApp.characters',
  'myApp.magic',
  'myApp.peerage',
  'myApp.peoples',
  'myApp.places',
  'myApp.religion',
  'myApp.weapons',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
