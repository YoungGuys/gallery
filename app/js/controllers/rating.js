'use strict';

artApp.controller('ratingCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.currentDate = new Date();


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);
            $scope.allJury = data;
        });


    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log('\nProjects');
            console.log(data);

            $scope.projects = data;

        })



}]);