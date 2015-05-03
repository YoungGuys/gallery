'use strict';

artApp.controller('adminCtrl',['$scope','$rootScope', '$http', function($scope, $rootScope, $http) {


    $scope.autorization = function () {

        if ($scope.formAdmin.$valid) {

            var data = {
                login: $scope.login,
                pass: $scope.pass
            };
            console.log(data);

            $http.get('api/get/admin', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAdmin autorization');
                    console.log(data);
                    if (data) {
                        $rootScope.admin = true;
                        location.href = '#/main';
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('\nAdmin autorization "Error"')
                });

        }

    };

}]);