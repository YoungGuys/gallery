'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/user', {params: {id_user: $routeParams.id}} )
        .success(function(data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            $scope.painter = data;
            $scope.photo = [];
            $scope.photo[0] = data.photo;

        });


    $scope.updatePainter = function () {

        if ($scope.formEditPainter.$valid) {

            //var data;

            //data = $scope.painter;
            //data.id_user = $routeParams.id;
            //data.photo = $scope.photo[0];

            var data = {
                id_user:        $routeParams.id,
                fio_eng:        $scope.painter.fio_eng,
                bio_eng:        $scope.painter.bio,
                town_eng:       $scope.painter.town_eng,
                education_eng:  $scope.painter.education_eng,
                photo:          $scope.photo[0]
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


    //$scope.removePhoto = function () {
    //    $scope.photo = null;
    //    $scope.files = null;
    //};

}]);