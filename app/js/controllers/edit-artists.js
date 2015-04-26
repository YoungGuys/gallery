'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.editPainter = function () {
        $http.post('api/post/artist', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });
    }


}]);