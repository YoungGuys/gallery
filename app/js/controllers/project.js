'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$routeParams', 'Lightbox', function($scope, $http, $routeParams, Lightbox) {

    $scope.Lightbox = Lightbox;

    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log(data);

            //data.forEach(function(item, i){
            //    if ( item.id_project == $routeParams.id ) {
            //        $scope.project = item;
            //        return false;
            //    }
            //});

            for (var item in data) {
                if ( item === $routeParams.id ) {
                    $scope.project = data[item];
                    return false;
                }
            }

            //$scope.project.prevProject = data.length == i + 1 ? 0 : i + 1;
            //$scope.project.nextProject = data.length == i + 1 ? 0 : i + 1;
        });


    //title_eng
    //photo
    //description
    //projectName
    //projectPhoto
    //prevProject
    //nextProject

}]);