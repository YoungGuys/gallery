'use strict';

artApp.controller('addArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.multipleUpload = false;


    $scope.addPainter = function () {

        //if ($scope.formAddPainter.$valid && $scope.photo) {

        if ($scope.formAddPainter.$valid) {

            var data = {
                fio_eng: $scope.name,
                bio: $scope.bio,
                photo: $scope.photo || null
            };
            console.log(data);

            $http.get('api/post/addArtist', {params: data})
                .success(function (data, status, headers, config) {
                    console.log(data);

                    if (data) {
                        $scope.name = null;
                        $scope.bio = null;
                        $scope.photo = null;
                        $scope.files = null;
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };


}]);