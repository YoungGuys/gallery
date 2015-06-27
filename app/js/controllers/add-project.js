'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.multipleUpload = true;

    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nall users');
            console.log(data);

            $scope.painters = data;

        });


    $scope.addProject = function () {

        if (!$scope.formAddProject.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }

        if ($scope.project.id_user == "null") {
            $scope.status = "danger";
            $scope.message = "error";
            return false;
        }

        $scope.project.photos = $scope.photo;

        $scope.project = {"json": JSON.stringify($scope.project)};

        console.log('\nsend server data add PROJECT');
        console.log($scope.project);

        $http.get('api/post/project', {params: $scope.project})
            .success(function(data, status, headers, config) {
                console.log('\nanswer add project');
                console.log(data);

                if (data) {
                    $scope.project = {};
                    $scope.photo = [];
                    $scope.status = "success";
                    $scope.message = "successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "error";
                }
            })
            .error(function(data, status, headers, config) {
                console.log('\nanswer add project "error"')
            });

    };

}]);