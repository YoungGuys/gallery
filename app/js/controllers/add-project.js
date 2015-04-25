'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.addProject = function () {

        var data = {
            name: $scope.name,
            artist: $scope.artist,
            info: $scope.info,
            file1: $scope.file1,
            file2: $scope.file2,
            file3: $scope.file3,
            file4: $scope.file4
        };
        console.log (data);

        $http.post('api/post/', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };

}]);