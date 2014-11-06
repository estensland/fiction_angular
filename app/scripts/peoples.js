'use strict';

angular.module('myApp.peoples', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/peoples', {
      templateUrl: 'partials/peoples/',
      controller: 'PeoplesCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/peoples.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
    $routeProvider.when('/peoples/:name', {
      templateUrl: 'partials/peoples/show.html',
      controller: 'ThePeoplesCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/peoples.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('PeoplesCtrl', ['$scope', 'json_grab', function($scope, json_grab) {
    $scope.title = 'Peoples';
    $scope.peoples = json_grab;
}])
  .controller('ThePeoplesCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.title = $routeParams.name;
    $scope.keys = ['name', 'translation', 'desc'];
    $scope.json = json_grab;
    $scope.thePeople = json_grab[$scope.title];
  }]);