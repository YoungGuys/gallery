'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.autorization = function () {

        if ($scope.formLogin.$valid) {
            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            $http.get('api/get/jury', {params: data})
                .success(function(data, status, headers, config) {
                    console.log(data);

                    if (data[0].login == $scope.login) {
                        location.href = '#/main';
                    }

                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };

}]);