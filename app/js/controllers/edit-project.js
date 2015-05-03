'use strict';

artApp.controller('editProjectCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $scope.multipleUpload = true;


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;

        });


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nProjects');
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project == $routeParams.id ) {
                    $scope.project = item;
                    $scope.photo = item.photo;
                    return false;
                }
            });

        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.saveChange = function () {

        if ($scope.project.id_user == null) {
            alert('Choose an painter!');
            return false;
        }

        var data = {
            id_project:      $routeParams.id,
            id_user:         $scope.project.id_user,
            title_eng:       $scope.project.title_eng,
            description_eng: $scope.project.description_eng,
            photo:           $scope.photo
        };
        console.log('\nSend server data update project');
        console.log(data);


        $http.get('api/put/project', {params: data })
            .success(function(data, status, headers, config) {
                console.log('\nAnswer update project');
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };



}]);