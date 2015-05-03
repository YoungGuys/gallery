'use strict';

artApp.controller('projectListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log('\nProjects');
            console.log(data);

            $scope.projects = data;

        })
        .error(function(data, status, headers, config) {
            console.log('\nProjects error')
        });


    $scope.deleteProject = function (id, index) {

        if (confirm('Delete project?')) {

            $http.post('api/delete/project', {params: id})
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete project');
                    console.log(data);

                    if (data) {
                        $('.js-listProject tr').eq(index).hide(300);
                    }

                })
                .error(function(data, status, headers, config) {
                    console.log('Answer delete project "Error"')
                });

        }

    }

}]);