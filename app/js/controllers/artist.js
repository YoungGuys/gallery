'use strict';

artApp.controller('artistCtrl',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {


    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
        $scope.tab = setTab;
    };


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_user == $routeParams.id ) {
                    $scope.painter = item;
                    return false;
                }
            });

        });



    $http.get('api/get/artistprojects', {params: {artist: $routeParams.id} })
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                item.prevProject = data.length == i + 1 ? 0 : i + 1;
                item.nextProject = data.length == i + 1 ? 0 : i + 1;
            });

            $scope.projects = data;

        });


    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        $http.post('api/post/rating', {parse: data})
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };


    $scope.deleteProject = function () {
        var remove = confirm('Видалити проект?');

        if (remove) {
            $http.post('api/post/deleteProject', data)
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });
        }
    }

}]);