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

        weapons: ['$http', function($http) {
          return $http.get('/api/weapons.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
  }])

  .controller('CharactersCtrl', ['$scope', '$routeParams', 'characters', function($scope, $routeParams, characters) {
    $scope.title = 'Characters';
    $scope.characters = characters;
    $scope.param = $routeParams.id;
}])
  .controller('CharacterCtrl', ['$scope', '$routeParams', 'characters', 'weapons', function($scope, $routeParams, characters, weapons) {
    $scope.character = characters[$routeParams.id];
    $scope.coatOfArms = "/api/images/" + $scope.character.coatOfArms;

    $scope.title = function(){
      var title = '';
      var nobleOffice = $scope.character.nobleOffice;
      var bailicName = $scope.character.bailicName;
      var nativeName = $scope.character.nativeName;
      var house = $scope.character.house;
      var nickname = $scope.character.nickname;
      var profileImg = $scope.character.profileImg;

      if (nobleOffice !== undefined) {title = title + nobleOffice + " "; }
      if (bailicName !== '*Refuses*') {title = title + bailicName + " "; }
      if (nativeName !== '*Same*')    {title = title + nativeName + " ";}
      if (house !== 'Non-Noble')      {title = title + house;}
      if (nickname) {
        if (nickname.match(/\(.*\)/)){
          nickname = nickname.replace(/\(.*\)/, '');
        }
        title = title + " " + nickname;
      }

      return title;
    }();

    $scope.weapons = function(){
      var result = []

      if ($scope.character.weapons === undefined) {$scope.character.weapons = []}

      for(var i = 0, ii = $scope.character.weapons.length; i < ii;  i++) {
        result.push({weapon: weapons[$scope.character.weapons[i]], imgTag: $scope.character.weapons[i]});
      }
      return result;
    }();
  }]);
