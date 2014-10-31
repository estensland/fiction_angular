'use strict';

angular.module('myApp.characters', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/characters', {
      templateUrl: 'partials/characters/',
      controller: 'CharactersCtrl',
      resolve: {
        characters: ['$http', function($http) {
          return $http.get('/api/people.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
    $routeProvider.when('/characters/:id', {
      templateUrl: 'partials/characters/show.html',
      controller: 'CharacterCtrl',
      resolve: {
        characters: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/people.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('CharactersCtrl', ['$scope', '$routeParams', 'characters', function($scope, $routeParams, characters) {
    $scope.title = 'Characters';
    $scope.characters = characters;
    $scope.param = $routeParams.id;
}])
  .controller('CharacterCtrl', ['$scope', '$routeParams', 'characters', function($scope, $routeParams, characters) {
    $scope.character = characters[$routeParams.id];
    $scope.title = function(){
        var title = '';
        var bailicName = $scope.character.bailicName;
        var nativeName = $scope.character.nativeName;
        var house = $scope.character.house;
        var nickname = $scope.character.nickname;

        if (bailicName !== '*Refuses*') {title = title + bailicName + " "; }
        if (nativeName !== '*Same*')    {title = title + nativeName + " ";}
        if (house !== 'Non-Noble')      {title = title + house;}
        if (nickname) {
          if (nickname.match(/\(.*\)/)){
            nickname = nickname.replace(/\(.*\)/, '')
          }
          title = title + " " + nickname;
        }

        return title;
      }();
    }]);