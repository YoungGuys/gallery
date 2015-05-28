'use strict';

artApp.controller('ratingCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.currentDate = new Date();


    $http.get('api/get/ratingVisibility')
        .success(function(data, status, headers, config) {
            console.log('\nratingVisibility');
            console.log(data);

            $scope.ratingVisibility = (data == "false") ? false : true;

            if (data) apiData();
        });


    $scope.showRating = function () {
        $scope.ratingVisibility = $scope.ratingVisibility ? 0 : 1;

        $http.get(
            'api/put/settings',
            {params: {"ratingVisibility": $scope.ratingVisibility}}
        )
            .success(function(data, status, headers, config) {
                console.log('\nRating setting');
                console.log(data);

                apiData();
            });

    };


    function apiData() {
        $http.get('api/get/alljury')
            .success(function(data, status, headers, config) {
                console.log('\nAll jury');
                console.log(data);
                $scope.allJury = data;
            });


        $http.get('api/get/projects', {params: null})
            .success(function(data, status, headers, config) {
                console.log('\nProjects');
                console.log(data);

                $scope.projects = data;
            });
    }


}]);