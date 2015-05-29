'use strict';

artApp.controller('homeCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {


    $scope.idJury = $routeParams.id || $rootScope.idJury;


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            $scope.dataProjects = data;
        });


    $http.get('api/get/juryProjects', {params: {id_jury: $scope.idJury}} )
        .success(function(data, status, headers, config) {
            console.log('\njuryProjects');
            console.log(data);

            $scope.projects = [];

            for (var i in data) {
                for (var j in $scope.dataProjects) {
                    if (data[i].id_project == $scope.dataProjects[j].id_project) {
                        $scope.projects[i] = $scope.dataProjects[j];
                    }
                }
            }
            console.log($scope.projects);
        });



    $http.get('api/get/myRepeatProject')
        .success(function(data, status, headers, config) {
            console.log('\nmyRepeatProject');
            console.log(data);

            $scope.choseProjects = data
        });


    $scope.deleteRepeat = function (id) {
        $http.get('api/put/deleteRepeat', { params: {
            id_project: id,
            id_jury: $scope.idJury
        }})
            .success(function(data, status, headers, config) {
                console.log('\ndeleteRepeat');
                console.log(data);

                $scope.choseProjects = data
            });
    };

    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        $http.get('api/post/rating', {params: data} )
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add rating');
                console.log(data);

                $scope.deleteRepeat(id);
            })
            .error(function(data, status, headers, config) {
                console.log('Answer add rating "Error"');
            });


    };



    //$http.get('api/get/myRateProject')
    //    .success(function(data, status, headers, config) {
    //        console.log('\nJury rate project');
    //        console.log(data);
    //
    //        $scope.projects = {};
    //
    //        for (var i in data) {
    //            if (data[i].id_jury == $scope.idJury) {
    //                $scope.data.forEach(function(item, j){
    //                    if (item.id_project == data[i].id_project) {
    //                        $scope.projects[item.id_project] = item;
    //                    }
    //                });
    //            }
    //        }
    //        console.log($scope.projects);
    //    });


}]);