'use strict';

artApp.controller('artistCtrl',['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
        $scope.tab = setTab;
    };


    $http.get('api/get/user', {params: {id_user: $routeParams.id}} )
        .success(function(data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            if (data) $scope.painter = data;

        });


    $http.get('api/get/artistProjects', {params: {artist: $routeParams.id} })
        .success(function(data, status, headers, config) {
            console.log('\nArtist projects');
            console.log(data);

            if (data) {
                data.forEach(function(item, i){
                    item.prevProject = data.length == i + 1 ? 0 : i + 1;
                    item.nextProject = data.length == i + 1 ? 0 : i + 1;
                });
            }

            $scope.projects = data;

            if ($scope.projects.length > 1) $scope.btnVisible = true;

        });


    $http.get('api/get/myRateProject')
        .success(function(data, status, headers, config) {
            console.log('\nJury rate project');
            console.log(data);
            console.log($scope.projects);

            for (var i in data) {

                if (data[i].id_jury == $rootScope.idJury) {

                    //console.log(data[i].id_jury);

                    for (var j in $scope.projects) {

                        if ($scope.projects[j].id_project == data[i].id_project) {

                            $scope.projects[j].rate = true;
                            console.log($scope.projects[j].rate);

                        }

                    }

                }

            }
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


    $scope.deleteProject = function (id, i) {
        var remove = confirm('Видалити проект?');

        if (remove) {

            var data = {
                id_project: id
            };

            $http.get('api/delete/project', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('Answer delete project');
                    console.log(data);

                    if (data) {
                        $('.js-listProject tr').eq(i).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });
        }

    };




}]);