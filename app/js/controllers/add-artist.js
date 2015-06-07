'use strict';

artApp.controller('addArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.multipleUpload = false;


    $scope.addPainter = function () {

        if (!$scope.formAddPainter.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }


        $scope.painter.photo = $scope.photo || null;

        console.log($scope.painter);

        $http.get('api/post/addArtist', {params: $scope.painter})
            .success(function (data, status, headers, config) {
                console.log('\nAnswer add artist');
                console.log(data);

                if (data) {
                    $scope.painter = {};
                    $scope.photo = [];

                    $scope.status = "success";
                    $scope.message = "Successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "Error";
                }

            })
            .error(function (data, status, headers, config) {
                console.log('Answer add artist "Error"')
            });

    };


}]);