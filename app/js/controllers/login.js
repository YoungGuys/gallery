'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.autorization = function () {
        if ($scope.formLogin.$valid) {
            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            $http.post('api/get/autorization', data)
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };

}]);