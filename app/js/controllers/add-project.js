'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.multipleUpload = true;

    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
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
            $scope.message = "Error";
            return false;
        }

        $scope.project.photos = $scope.photo;

        $scope.project = {"json": JSON.stringify($scope.project)};

        console.log('\nSend server data add project');
        console.log($scope.project);

        $http.get('api/post/project', {params: $scope.project})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add project');
                console.log(data);

                if (data) {
                    $scope.project = {};
                    $scope.photo = [];
                    $scope.status = "success";
                    $scope.message = "Successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "Error";
                }
            })
            .error(function(data, status, headers, config) {
                console.log('\nAnswer add project "Error"')
            });

    };

}]);