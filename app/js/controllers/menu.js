'use strict';

artApp.controller('menuCtrl',['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {


    $scope.exit = function() {

        $rootScope.userName = null;
        $rootScope.admin = false;

        console.log($rootScope.userName);

    }

}]);