'use strict';

artApp.controller('mainCtrl',['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {

    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });

}]);