'use strict';

angular.module('myApp.peerage', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/peerage', {
      templateUrl: 'partials/peerage/',
      controller: 'PeerageCtrl',
      resolve: {
        json_grab: ['$http', function($http) {
          return $http.get('/api/peerage.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('PeerageCtrl', ['$scope', 'json_grab', function($scope, json_grab) {
    $scope.title = "Feudal Hierarchy";
    $scope.peerages = json_grab;
  }]);