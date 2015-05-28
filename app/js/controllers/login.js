'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$rootScope', '$cookieStore', '$location', function($scope, $http, $rootScope, $cookieStore, $location) {


    $scope.autorization = function () {

        if ($scope.formLogin.$valid) {

            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            if ($scope.login === 'admin') {

                $http.get('api/get/admin', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nAdmin autorization');
                        console.log(data);

                        if (data[0].login == 'admin') {

                            $cookieStore.put('authorization', true);
                            $cookieStore.put('admin', true);
                            $cookieStore.put('login', 'Admin');

                            $rootScope.admin = true;
                            $rootScope.userName = 'Admin';

                            $location.url('/main');

                        }
                        else {
                            _alert();
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
                            $cookieStore.put('admin', false);
                            $cookieStore.put('jury', true);
                            $cookieStore.put('login', data.login);
                            $cookieStore.put('idJury', data.id_jury);

                            $rootScope.admin = false;
                            $rootScope.jury = true;
                            $rootScope.idJury = data.id_jury
                            $rootScope.userName = data.login;

                            $location.url('/main');
                        }
                        else {
                            _alert();
                        }

                    })
                    .error(function(data, status, headers, config) {
                        console.log('Jury autorization Error')
                    });

            }

        }
    };


    function _alert() {
        $scope.alert = 'Incorrect login or password';

        setTimeout(function () {
            $scope.alert = '';
        }, 2000);
    }

}]);