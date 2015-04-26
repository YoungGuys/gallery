'use strict';

artApp.controller('artistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.painter = {
        name: "MiKolka",
        photo: "img.jpg",
        bio: "student"
    };

    $scope.painterProjects = [
        {
            photo: "img.jpg",
            name: "project1",
            id: "1"
        },
        {
            photo: "img.jpg",
            name: "project2",
            id: "2"
        }
    ];

    $scope.deleteProject = function () {
        var remove = confirm('Видалити проект?');

        if (remove) {
            $http.post('api/post/deleteProject', data)
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });
        }
    }

}]);