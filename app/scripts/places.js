'use strict';

angular.module('myApp.places', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/places', {
      templateUrl: 'partials/places/',
      controller: 'PlacesCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/places.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
    $routeProvider.when('/places/:name', {
      templateUrl: 'partials/places/show.html',
      controller: 'PlaceCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/places.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('PlacesCtrl', ['$scope', 'json_grab', function($scope, json_grab) {
    $scope.title = 'Places';
    $scope.places = json_grab;
}])
  .controller('PlaceCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.title = $routeParams.name;
    $scope.json = json_grab;
    $scope.place = json_grab[$scope.title];
    $scope.keys = ['name', 'translation', 'desc'];
    $scope.subs = $scope.place.subs;
  }]);