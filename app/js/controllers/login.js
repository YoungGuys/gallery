'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$rootScope', '$cookieStore', '$location', function($scope, $http, $rootScope, $cookieStore, $location) {


    $scope.autorization = function () {

        if ($scope.formLogin.$valid) {

            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            if ($scope.login === 'Admin') {

                $http.get('api/get/admin', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nAdmin autorization');
                        console.log(data);

                        if (data) {

                            $cookieStore.put('authorization', true);
                            $cookieStore.put('admin', true);
                            $cookieStore.put('login', 'Admin');

                        }
                    });

            }

            else {

                $http.get('api/get/jury', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nJury autorization');
                        console.log(data);

                        if (data.login == $scope.login) {

                            $cookieStore.put('authorization', true);
                            $cookieStore.put('jury', true);
                            $cookieStore.put('login', data.login);
                            $cookieStore.put('idJury', data.id_jury);

                        }

                    })
                    .error(function(data, status, headers, config) {
                        console.log('Jury autorization Error')
                    });

            }

            $location.url('/main');

        }
    };

}]);