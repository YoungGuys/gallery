'use strict';

artApp.controller('addJuryCtrl',['$scope','$http', function($scope, $http) {

    $scope.jury = {};

    $scope.addJury = function () {

        console.log($scope.formAddJury);
        console.log($scope.formAddJury.$valid);

        if (!$scope.formAddJury.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }

        $scope.jury.photo = $scope.photo;
        console.log($scope.jury);

        $http.get('/api/post/addjury', {params: $scope.jury})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add jury');
                console.log(data);

                if (data) {
                    $scope.jury = {};
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
                console.log('\nAnswer add jury "Error"')
            });
    };



}]);
