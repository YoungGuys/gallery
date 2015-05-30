'use strict';

artApp.controller('homeCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {


    $scope.idJury = $routeParams.id || $rootScope.idJury;


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            $scope.dataProjects = data;
            myRateProject();
        });


    //$http.get('api/get/juryProjects', {params: {id_jury: $scope.idJury}} )
    //    .success(function(data, status, headers, config) {
    //        console.log('\njuryProjects');
    //        console.log(data);
    //
    //        $scope.projects = [];
    //
    //        for (var i in data) {
    //            for (var j in $scope.dataProjects) {
    //                if (data[i].id_project == $scope.dataProjects[j].id_project) {
    //                    $scope.projects.push($scope.dataProjects[j]);
    //                }
    //            }
    //        }
    //        console.log($scope.projects);
    //    });



    $http.get('api/get/myRepeatProject')
        .success(function(data, status, headers, config) {
            console.log('\nmyRepeatProject');
            console.log(data);

            $scope.choseProjects = data;

            for (var i in data) {
                for (var j in $scope.dataProjects) {
                    if (data[i].id_project == $scope.dataProjects[j].id_project) {
                        $scope.choseProjects[i].photos = $scope.dataProjects[j].photos;
                    }
                }
            }

        });


    $scope.deleteRepeat = function (id, i) {
        $http.get('api/put/deleteRepeat', { params: {
            id_project: id,
            id_jury: $scope.idJury
        }})
            .success(function(data, status, headers, config) {
                console.log('\ndeleteRepeat');
                console.log(data);

                $scope.choseProjects.splice(i, 1);
                myRateProject();
            });
    };


    $scope.notChooseProject = function (id, i) {

        var data = {
            id_project: id
        };

        $http.get('api/delete/rate', {params: data} )
            .success(function(data, status, headers, config) {
                console.log('\nAnswer delete rating');
                console.log(data);

                if (data) $scope.deleteRepeat(id, i);
            })
    };


    $scope.chooseProject = function(id, i) {

        $scope.deleteRepeat(id, i);

    };


    function myRateProject () {
        $http.get('api/get/myRateProject')
            .success(function(data, status, headers, config) {
                console.log('\nMy rate project');
                console.log(data);

                $scope.projects = data;

                for (var i in data) {
                    for (var j in $scope.dataProjects) {
                        if (data[i].id_project == $scope.dataProjects[j].id_project) {
                            $scope.projects[i].photos = $scope.dataProjects[j].photos;
                        }
                    }
                }

            });
    }


}]);