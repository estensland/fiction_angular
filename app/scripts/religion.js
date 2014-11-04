'use strict';

angular.module('myApp.religion', ['ngRoute'])

  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/religions', {
      templateUrl: 'partials/religions/',
      controller: 'ReligionCtrl',
    });
    $routeProvider.when('/religions/:name', {
      templateUrl: 'partials/religions/show.html',
      controller: 'TheFaithCtrl',
      resolve: {
        json_grab: ['$http','$routeParams', function($http, $routeParams) {
          return $http.get('/api/religions.json').then(function(response) {
            return response.data;
          });
        }],
      }
    });
  }])

  .controller('ReligionCtrl', ['$scope', function($scope) {
    $scope.title = 'Religions';
}])
  .controller('TheFaithCtrl', ['$scope', '$routeParams', 'json_grab', function($scope, $routeParams, json_grab) {
    $scope.faith_data = json_grab[$routeParams.name];
    $scope.param = $routeParams.name;
    $scope.title = $scope.faith_data.name;
    $scope.aliases = $scope.faith_data.aliases;
    $scope.divines = $scope.faith_data.divines;
    $scope.lesserBeings = $scope.faith_data.lesserBeings;
    $scope.clergy = $scope.faith_data.clericClasses;
    $scope.spirits = $scope.faith_data.spirits;
    $scope.spiritClerics = $scope.faith_data.spiritClerics;
    $scope.cosmology = $scope.faith_data.cosmology;
    $scope.orders = $scope.faith_data.clericalOrders;
    $scope.holyOnes = $scope.faith_data.holyOnes;
  }]);