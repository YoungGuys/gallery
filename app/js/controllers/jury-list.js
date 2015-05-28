'use strict';

artApp.controller('juryListCtrl',['$scope','$http', function($scope, $http) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);
            $scope.jury = data;
        });


    $scope.deleteJury = function(id, index) {

        if (!confirm('Ви дійсно бажаєте видалити журі?')) {
            return false;
        }

        var data = {'id_jury': id};

        $http.get('api/delete/jury', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer delete jury');
                console.log(data);

                if (data) {
                    $('.js-juryList tr').eq(index).hide(300);
                }

            });
    }

}]);