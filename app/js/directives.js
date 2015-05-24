'use strict';

/* Directives */


artApp.directive('formStepOne', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/step-1.html'
    }
});


artApp.directive('formStepTwo', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/step-2.html'
    }
});


artApp.directive('formStepThree', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/step-3.html'
    }
});


artApp.directive('formStepFour', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/step-4.html'
    }
});


artApp.directive('formCollective', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/form-collective.html'
    }
});


artApp.directive('formIndividual', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/form-individual.html'
    }
});


artApp.directive('formMember', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/registration/form-member.html'
    }
});


artApp.directive('menu', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/menu.html',
        controller: function($scope, $rootScope, $location, $cookieStore) {

            var url = $location.path().split('/')[1];

            $scope.page = function (page) {
                return url == page ? 'active' : '';
            };

            $scope.exit = function() {
                $cookieStore.put('authorization', false);
                $cookieStore.put('admin', false);

                //$cookieStore.put('jury', false);
                //$cookieStore.put('login', false);
                //$cookieStore.put('idJury', false);
            };
        }
    }
});


artApp.directive('uploadFile', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/upload-file.html',
        controller: 'uploadFileCtrl'
    }
});


artApp.directive('jurySelectProject', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/jury-select-project.html',
        controller: 'homeCtrl'
    }
});


artApp.directive('fotoramaImg', function () {
    return {
        link: function(scope, element, attrs) {
            if (scope.$last) {
                setTimeout(function(){
                    $('.fotorama')
                        .on('fotorama:ready', function (e, fotorama) {
                            fotorama.show();
                        })
                        .fotorama({
                            width: '100%',
                            height: 400,
                            loop: true,
                            keyboard: true,
                            nav: 'thumbs',
                            allowfullscreen: true
                        });
                });
            }
        }
    }
});