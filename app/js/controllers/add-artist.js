'use strict';

artApp.controller('addArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.multipleUpload = false;

    $scope.setFiles = function(name) {
        $scope.photo = name || 0;

        for (var i = 0; i < $scope.photo.length; i++) {
            $scope.photo[i] = $scope.photo[i].name;
        }
        //console.log($scope.photo || null);
    };


    $scope.addPainter = function () {

        var data = {
            login: $scope.name,
            bio:   $scope.bio,
            photo: $scope.photo[0] || null
        };
        console.log(data);

        //$http.get('/api/post/addpainter', {params: data})
        //    .success(function(data, status, headers, config) {
        //        console.log(data);
        //    })
        //    .error(function(data, status, headers, config) {
        //        console.log('NOT OK')
        //    });
    };


}]);