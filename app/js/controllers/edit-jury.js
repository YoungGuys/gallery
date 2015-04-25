'use strict';

artApp.controller('editJuryCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    //name
    //pass
    //info
    //photo

    $scope.updateJury = function () {

        var data = {
            name: $scope.name,
            pass: $scope.pass,
            info: $scope.info,
            photo: $scope.photo
        };

        $http.post('api/post/editjury', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
    };

}]);