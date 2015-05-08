'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/user', {params: {id_user: $routeParams.id}} )
        .success(function(data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            $scope.painter = data;
            $scope.photo = data.photo;

        });




    $scope.updatePainter = function () {

        if ($scope.formEditPainter.$valid) {

            var data = {
                id_user: $routeParams.id,
                fio:     $scope.painter.fio_eng,
                bio:     $scope.painter.bio,
                photo:   $scope.photo
            };

            console.log(data);
            $http.get('api/put/user', {params: data} )
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