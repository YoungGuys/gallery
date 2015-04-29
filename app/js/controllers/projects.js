'use strict';

artApp.controller('projectsCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.projects = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });

}]);