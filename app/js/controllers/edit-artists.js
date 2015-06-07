'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/user', {params: {id_user: $routeParams.id}})
        .success(function (data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            $scope.painter = data;
            $scope.photo = [];
            $scope.photo[0] = data.photo;

        });


    $scope.updatePainter = function () {

        if ($scope.formEditPainter.$valid) {

            var data;

            data = $scope.painter;
            data.id_user = $routeParams.id;
            data.photo = $scope.photo[0];

            console.log(data);
            $http.get('api/put/user', {params: data})
                .success(function (data, status, headers, config) {
                    console.log(data);

                    if (data) {
                        $scope.status = "success";
                        $scope.message = "Successfully";
                    }
                    else {
                        $scope.status = "danger";
                        $scope.message = "Error";
                    }

                })
                .error(function (data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    };


//$scope.removePhoto = function () {
//    $scope.photo = null;
//    $scope.files = null;
//};

}]);