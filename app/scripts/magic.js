'use strict';

angular.module('myApp.magic', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/magic', {
      templateUrl: 'partials/magic/',
      controller: 'MagicsCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/magic.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
    $routeProvider.when('/magic/:name', {
      templateUrl: 'partials/magic/show.html',
      controller: 'MagicCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/magic.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('MagicsCtrl', ['$scope', 'json_grab', function($scope, json_grab) {
    $scope.title = 'Magic';
    $scope.magic = json_grab;
}])
  .controller('MagicCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.title = $routeParams.name;
    $scope.json = json_grab;
    $scope.magic = json_grab[$scope.title];
    $scope.keys = ['name', 'action', 'translation'];
    $scope.blurb = $scope.magic.blurb;
    $scope.spells = $scope.magic.spells;
  }]);