'use strict';

artApp.controller('adminCtrl',['$scope','$rootScope', '$http', '$cookieStore', function($scope, $rootScope, $http, $cookieStore) {


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

                        $cookieStore.put('authorization', true);
                        $cookieStore.put('admin', true);
                        $cookieStore.put('login', 'Admin');

                        location.href = '#/main';
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('\nAdmin autorization "Error"')
                });

        }

    };


}]);