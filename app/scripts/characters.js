'use strict';

angular.module('myApp.characters', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/characters', {
      templateUrl: 'partials/characters/',
      controller: 'CharactersCtrl',
      resolve: {
        characters: ['$http', function($http) {
          return $http.get('/api/characters.json').then(function(response) {
            return response.data;
          })
        }]
      }
    });
    $routeProvider.when('/characters/:id', {
      templateUrl: 'partials/characters/show.html',
      controller: 'CharactersCtrl',
      resolve: {
        characters: ['$http', function($http) {
          return $http.get('/api/characters.json').then(function(response) {
            return response.data;
          })
        }]
      }
    });
  }])

  .controller('CharactersCtrl', ['$scope', '$routeParams', 'characters', function($scope, $routeParams, characters) {
    $scope.title = 'Characters';
    $scope.test = $routeParams['id'];
    $scope.characters = characters;
}]);