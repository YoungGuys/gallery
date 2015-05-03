'use strict';

artApp.controller('juryListCtrl',['$scope','$http', '$rootScope', function($scope, $http, $rootScope) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            $scope.jury = data;
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deleteJury = function(id, index) {

        if (!confirm('Ви дійсно бажаєте видалити журі?')) {
            return false;
        }

        var data = {'id_jury': id};
        $http.get('api/delete/jury', {params: data})
            .success(function(data, status, headers, config) {
                console.log(data);
                if (data) {
                    $('.js-juryList tr').eq(index).hide(300);
                }
            });
    }

}]);