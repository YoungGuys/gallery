'use strict';

artApp.controller('artistListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/allusers', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.painters = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deletePainter = function (id, index) {

        if (confirm('Delete painter?')) {

            $http.post('api/delete/user', {params: id})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    if (data) {
                        $('.js-lsit tr').eq(index).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }


    }


}]);