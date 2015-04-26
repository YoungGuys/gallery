'use strict';

artApp.controller('editProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.saveChange = function () {

    };


    $scope.addPhoto = function (el) {
        $scope.project.photo.push("");
    };


    $scope.changePhoto = function (el) {
        console.log('sd');
    };

    $scope.project = {
        photo: [
            "1",
            "2",
            "3"
        ]
    };

}]);