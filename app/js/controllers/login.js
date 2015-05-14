'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {


    $scope.autorization = function () {

        if ($scope.formLogin.$valid) {

            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            $http.get('api/get/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nJury autorization');
                    console.log(data);

                    if (data.login == $scope.login) {

                        $rootScope.userName = data.login;
                        $rootScope.idJury = data.id_jury;
                        $rootScope.jury = true;

                        location.href = '#/main';

                    }

                })
                .error(function(data, status, headers, config) {
                    console.log('Jury autorization Error')
                });

        }
    };

}]);