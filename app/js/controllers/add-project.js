'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.multipleUpload = true;

    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;

        });


    $scope.addProject = function () {

        if ($scope.project.id_user == "null") {
            alert('Choose painter!');
            return false;
        }

        var data = {
            id_user:         $scope.project.id_user,
            title_eng:       $scope.project.name,
            description_eng: $scope.project.description,
            photos:          $scope.photo
        };

        //data = "json=" + JSON.stringify(data);
        data = {"json": JSON.stringify(data)};
        console.log('\nSend server data add project');
        console.log(data);

        $http.get('api/post/project', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add project');
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('\nAnswer add project "Error"')
            });

    };

}]);