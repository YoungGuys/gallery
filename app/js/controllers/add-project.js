'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.multipleUpload = true;


    $scope.addProject = function () {

        if ($scope.artist == undefined) {
            alert('Виберіть художника');
            return false;
        }

        var data = {
            name: $scope.name,
            artist: $scope.artist,
            info: $scope.info,
            photo: $scope.photo
        };
        console.log(data);

        //$http.post('api/post/', {params: data})
        //    .success(function(data, status, headers, config) {
        //        console.log(data);
        //    })
        //    .error(function(data, status, headers, config) {
        //        console.log('NOT OK')
        //    });

    };

}]);