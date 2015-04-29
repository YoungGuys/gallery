'use strict';

artApp.controller('addJuryCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.addJury = function () {

        var data = {
            login: $scope.login,
            pass:  $scope.pass,
            fio:   $scope.fio,
            bio:   $scope.bio,
            photo: $scope.photo
        };
        console.log(data);

        $http.get('/api/post/addjury', {params: data})
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });
    };



}]);
