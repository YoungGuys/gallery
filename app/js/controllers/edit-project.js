'use strict';

artApp.controller('editProjectCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $scope.multipleUpload = true;


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;

        });


    $http.get('api/get/project', {params: {id_project: $routeParams.id} } )
        .success(function(data, status, headers, config) {
            console.log('\nProject id = ' + $routeParams.id);
            console.log(data);

            $scope.project = data.project;
            $scope.user = data.user;
            $scope.project.id_user = data.statement.id_user;

            $scope.photo = [];

            data.photos.forEach(function(item, i){
                $scope.photo[i] = item.src
            });

        });


    $scope.saveChange = function () {

        if ($scope.project.id_user == null) {
            alert('Choose an painter!');
            return false;
        }

        var data = $scope.project;

        data.id_project = $routeParams.id;
        data.photos = $scope.photo;

        data = {"json": JSON.stringify(data)};
        console.log('\nSend server data update project');
        console.log(data);


        $http.get('api/put/project', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer update project');
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('\nAnswer update project "Error"')
            });

    };



}]);