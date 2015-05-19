'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$routeParams', '$rootScope', '$location', 'Lightbox', function($scope, $http, $routeParams, $rootScope, $location, Lightbox) {

    $scope.Lightbox = Lightbox;

    //$scope.items = [{img: 'iurl', thumb: 'turl', full: 'furl'}, {...}, ...]; //Model

    $scope.options = {
        width: '100%',
        height: 400,
        loop: true,
        keyboard: true,
        nav: 'thumbs'
    };


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

                    $scope.project.photos.forEach(function(item, i){
                        $scope.project.photos[i] = {img: 'images/' + item.src};
                    });

                    console.log($scope.project);

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
    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            //for (var i = 0; i < data.length; i++) {
            for (var i in data) {
                if (data[i].login == $rootScope.userName) {
                    data[i].projects.forEach(function(item, i){
                        if (item.id_project == $routeParams.id) {
                            $scope.rate = true;
                            console.log($scope.rate);
                        }
                    });
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('All jury error')
        });


    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        $http.get('api/post/rating', {params: data} )
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add rating');
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('Answer add rating "Error"');
            });

    };


}]);