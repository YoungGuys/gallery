'use strict';

artApp.controller('juryListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/jury')
        .success(function(data, status, headers, config) {
            //$scope.jury = data;
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


}]);