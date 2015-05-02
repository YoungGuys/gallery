'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project == $routeParams.id ) {
                    $scope.project = item;
                    return false;
                }
            });

        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });

    //title_eng
    //photo
    //description
    //projectName
    //projectPhoto
    //prevProject
    //nextProject

}]);