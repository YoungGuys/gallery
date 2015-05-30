'use strict';

artApp.controller('ratingCtrl',['$scope','$http', '$location', "$route", function($scope, $http, $location, $route) {

    $scope.currentDate = new Date();
    $scope.select = [];


    /*
        перевірка видимості рейтингу,
        if true, дані не загружаються
     */
    $http.get('api/get/ratingVisibility')
        .success(function(data, status, headers, config) {
            console.log('\nratingVisibility');
            console.log(data);

            $scope.ratingVisibility = (data == "false") ? false : true;

            if (!$scope.ratingVisibility) apiData();
        });


    $scope.showRating = function () {
        $scope.ratingVisibility = $scope.ratingVisibility ? 0 : 1;

        $http.get(
            'api/put/settings', {
                params: {
                    "ratingVisibility": $scope.ratingVisibility
                }
            }
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


    $scope.selectMode = function () {
        $scope.selectProject = $scope.selectProject ? 0 : 1;
    };

    //$scope.selectProject = function (id) {
    //$scope.select.push(id)
    //};

    $scope.sendToVote = function () {
        var select = '';
        var n = $scope.select.length;

        $scope.select.forEach(function(item, i){

            if (item > 0) {
                select += item;
            }

            if (i < n - 1) {
                select += ',';
            }

        });

        $http.get('api/put/setRepeat', {params: {id_project: select} })
            .success(function(data, status, headers, config) {
                console.log('\nsendToVote');
                console.log(select);
                console.log(data);

                if (data) $route.reload();
            });
    };


}]);