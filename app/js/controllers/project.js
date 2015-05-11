'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$routeParams', '$location', 'Lightbox', function($scope, $http, $routeParams, $location, Lightbox) {

    $scope.Lightbox = Lightbox;

    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            //$scope.data = data;
            //dataPage(data, $routeParams.id);

            data.forEach(function(item, i){
                if ( item.id_project ==  $routeParams.id) {
                    $scope.project = item;
                    $scope.project.prevProject = i == 0 ? data[data.length - 1].id_project : data[i - 1].id_project;
                    $scope.project.nextProject = data.length == i + 1 ?  data[0].id_project : data[i + 1].id_project;
                    return false;
                }
            });
            //console.log($scope.project);

        });


    $scope.setProject = function(id) {
    //    $location.path("/project/"+ id).replace().reload(false);
    //    alert(id);
    //    history.replaceState({}, '', 'http://gallery.com/#/project/' + id);
    //    dataPage($scope.data, id)
    };


    //function dataPage (data, id) {

    //}


}]);