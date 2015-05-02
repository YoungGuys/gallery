'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                if (data[i].id_jury == $routeParams.id) {
                    $scope.painter = data[i];
                    $scope.photo = $scope.data.photo;
                    console.log($scope.files);
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.updatePainter = function () {

        if ($scope.formEditJury.$valid) {

            var data = {
                id_user: $routeParams.id,
                fio: $scope.painter.fio,
                bio: $scope.painter.bio,
                photo: $scope.photo
            };

            console.log(data);
            $http.get('api/put/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
        $scope.files = null;
    };

}]);