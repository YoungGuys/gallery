'use strict';

artApp.controller('artistListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.post('api/post/artist', data)
        .success(function(data, status, headers, config) {
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


}]);