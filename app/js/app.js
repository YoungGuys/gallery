'use strict';

/* App Module */
var artApp = angular.module('artApp', ['ngRoute', 'ngFileUpload']);


artApp.run(function ($rootScope, $location, $cookieStore, AuthService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.authenticate) {
            if (!AuthService.isAuthenticated()) {
                $location.url("/Login");
            };
        };















/*
artApp.controller('appCtrl', ['$scope', '$location', '$userProvider',
    function($scope, $location, $userProvider) {
        //удобно, чтобы не инжектить $location в дочерних контроллерах
        //однако, плохо для тестирования
        $scope.goTo = function(path) {
            $location.path(path);
        };
        //расширяем самый верхний $scope методами провайдера пользователя
        //после этого удобно использовать эти методы сразу в представлениях (см. books.html)
        angular.extend($scope, $userProvider, true);
    }]);


artApp.controller('booksCtrl', ['$scope', '$location', '$routeParams', function($scope, $location, $routeParams) {
    $scope.booksFilter = $routeParams.letter;
    $scope.books = [
        { Name: 'Zen and the Art of Motorcycle Maintenance' },
        { Name: 'Ulysses' },
        { Name: 'Gatsby' },
        { Name: 'Ginger' },
        { Name: 'Zimmermann Telegram' }
    ];
    $scope.bookClick = function(book) {
        $scope.goTo('/books/' + book.Name[0].toLowerCase());
    };
    $scope.filterBooks = function() {
        return function(book) {
            if (!$scope.booksFilter) {
                return true;
            }
            return book.Name[0].toLowerCase() === $scope.booksFilter;
        };
    };
}]);

artApp.controller('settingsCtrl', ['$scope', function ($scope) { }]);



var authorizationModule = angular.module('authorizationModule', []);

authorizationModule.controller('loginCtrl', ['$scope', 'authorizationFactory', '$location',
    function($scope, authorizationFactory, $location){
        $scope.loginClick = function() {
            if (authorizationFactory.login($scope.login, $scope.pass)) {
                $location.path('/books');
            } else {
                alert('Pass is 123456!');
            }
        }
    }]);

//заглушка фабрики, обращающейся к серверу для проверки авторизации
authorizationModule.factory('authorizationFactory',['$userProvider',
    function($userProvider){
        var login = function(login, pass){
            if (pass !== '123456') {
                return false;
            }
            if (login === 'admin') {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.Admin]});
            } else {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.User]});
            }
            return true;
        }

        return {
            login: login,
        }
    }]);

//провайдер информации о пользователе (роли, логин и тд)
authorizationModule.factory('$userProvider', function(){
    var rolesEnum = {
        Admin: 0,
        User: 1
    };
    var setUser = function(u){
        user = u;
    }
    var getUser = function(){
        return user;
    }

    return {
        getUser: getUser,
        setUser: setUser,
        rolesEnum: rolesEnum
    }
});
*/