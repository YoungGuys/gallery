'use strict';

artApp.controller('homeCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {


    $scope.idJury = $routeParams.id || $rootScope.idJury;
    //console.log()


    $http.get('api/get/projects', {params: {id_jury: $scope.idJury} } )
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            $scope.data = data;
        });


    $http.get('api/get/myRateProject')
        .success(function(data, status, headers, config) {
            console.log('\nJury rate project');
            console.log(data);

            $scope.projects = {};

            for (var i in data) {
                if (data[i].id_jury == $scope.idJury) {
                    $scope.data.forEach(function(item, j){
                        if (item.id_project == data[i].id_project) {
                            $scope.projects[item.id_project] = item;
                        }
                    });
                }
            }
            console.log($scope.projects);
        });


}]);