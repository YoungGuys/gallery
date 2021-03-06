
artApp.controller('projectCtrl',['$scope','$http', '$routeParams', '$rootScope', '$location', function($scope, $http, $routeParams, $rootScope, $location) {
    'use strict';

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

                    painter();

                    return false;
                }
            });

        });


    $http.get('api/get/myRepeatProject')
        .success(function(data, status, headers, config) {
            console.log('\nmyRepeatProject');
            console.log(data);

            $scope.choseProjects = data;

        });


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            for (var i in $scope.choseProjects) {

                if ($scope.choseProjects[i].id_project == $routeParams.id) {

                    $scope.deleteRepeatRating = true;
                    return false;

                }

            }

            for (var i in data) {

                if (data[i].login == $rootScope.userName) {

                    data[i].projects.forEach(function(item){

                        if (item.id_project == $routeParams.id) {
                            $scope.rate = true;
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
            if ($scope.deleteRepeatRating) {

                data.id_jury = $scope.idJury;

                $http.get('api/put/deleteRepeat', { params: data })
                    .success(function(data, status, headers, config) {
                        console.log('\ndeleteRepeat');
                        console.log(data);  // -> null

                        $scope.rate = true;
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

        }

    };



    function painter () {
        $http.get('api/get/user', {
            params: {
                id_user: $scope.project.id_user
            }
        })
            .success(function(data, status, headers, config) {
                console.log('\nUser id = ' + $scope.project.id_user);
                console.log(data);

                if (data) $scope.painter = data;

            });
    }



}]);