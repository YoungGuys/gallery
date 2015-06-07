'use strict';

artApp.controller('alertCtrl',['$scope', '$timeout', function($scope, $timeout) {

    $scope.$watch('status', function () {

        $timeout(function(){
            $scope.status = false;
        }, 4000);

    });


}]);