'use strict';

artApp.controller('editJuryCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                if (data[i].id_jury == $routeParams.id) {
                    $scope.data = data[i];
                    $scope.data.pass = null;
                    $scope.photo = $scope.data.photo;
                    //$scope.files = [];
                    //$scope.files[0] = $scope.data.photo;
                    console.log($scope.files);
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('All jury error')
        });


    $scope.updateJury = function () {

        if ($scope.formEditJury.$valid) {

            if (!$scope.data.login) {
                alert('Enter login');
                return false;
            }
            else if (!$scope.data.pass) {
                alert('Enter password');
                return false;
            }

            var data = {
                id_jury: $scope.data.id_jury,
                fio: $scope.data.fio,
                login: $scope.data.login,
                pass: $scope.data.pass,
                bio: $scope.data.bio,
                photo: $scope.photo
            };
            console.log('\nUpdate jury');
            console.log(data);

            $http.get('api/put/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer update jury');
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer update jury "Error"')
                });

        }

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
        $scope.files = null;
    };


}]);