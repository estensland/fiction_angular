'use strict';

angular.module('myApp.weapons', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/weapons', {
      templateUrl: 'partials/weapons/',
      controller: 'WeaponsCtrl',
      resolve: {
        weapons: ['$http', function($http) {
          return $http.get('/api/weapons.json').then(function(response) {
            return response.data;
          });
        }]
      }
    });
    $routeProvider.when('/weapons/:id', {
      templateUrl: 'partials/weapons/show.html',
      controller: 'WeaponCtrl',
      resolve: {
        weapons: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/weapons.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('WeaponsCtrl', ['$scope', '$routeParams', 'weapons', function($scope, $routeParams, weapons) {
    $scope.title = 'Weapons';
    $scope.weapons = weapons;
    $scope.param = $routeParams.id;
}])
  .controller('WeaponCtrl', ['$scope', '$routeParams', 'weapons', function($scope, $routeParams, weapons) {
    $scope.weapon = weapons[$routeParams.id];
    $scope.image = "/api/images/weapons/" + weapons[$routeParams.id];weapons[$routeParams.id]
  }]);