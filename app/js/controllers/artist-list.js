'use strict';

artApp.controller('artistListCtrl',['$scope','$http', function($scope, $http) {


    $http.get('api/get/allusers', {params: null})
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.visibilityUser = function (i, id, status) {

        var data = {
            id_user: id,
            visibility: status == 1 ? 0 : 1
        };

        $http.get('api/put/changeVisibilityUser', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nVisibility users');
                console.log(data);

                if (data) {
                    $scope.painters[i].visibility = status == 1 ? 0 : 1;
                }

                //$scope.painters = data;
            });

    };


    $scope.deletePainter = function (id, i) {

        if (confirm('Delete painter?')) {

            var data = {
                id_user: id
            };

            $http.get('api/delete/user', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete user');
                    console.log(data);

                    if (data) {
                        $('.js-lsit tr').eq(i).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }


    }


}]);