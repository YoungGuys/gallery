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
        templateUrl: 'template/menu.html'
    }
});