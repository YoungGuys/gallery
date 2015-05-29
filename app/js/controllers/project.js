'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$routeParams', '$rootScope', '$location', function($scope, $http, $routeParams, $rootScope, $location) {


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project ==  $routeParams.id) {
                    $scope.project = item;
                    $scope.project.prevProject = i == 0 ? data[data.length - 1].id_project : data[i - 1].id_project;
                    $scope.project.nextProject = data.length == i + 1 ?  data[0].id_project : data[i + 1].id_project;

                    $scope.photos = $scope.project.photos; //fotorama directive

                    return false;
                }
            });

        });


    $scope.setProject = function(id) {
    //    $location.path("/project/"+ id).replace().reload(false);
    //    alert(id);
    //    history.replaceState({}, '', 'http://gallery.com/#/project/' + id);
    //    dataPage($scope.data, id)
    };

    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            for (var i in data) {
                if (data[i].login == $rootScope.userName) {
                    data[i].projects.forEach(function(item){
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

        if ($scope.rate) {
            $http.get('api/delete/rate', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete rating');
                    console.log(data);
                    if (data) $scope.rate = false;
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer delete rating "Error"');
                });
        }
        else {
            $http.get('api/post/rating', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer add rating');
                    console.log(data);
                    if (data) $scope.rate = true;
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer add rating "Error"');
                });
        }

    };


}]);