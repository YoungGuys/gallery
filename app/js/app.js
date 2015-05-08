'use strict';

/* App Module */
var artApp = angular.module('artApp', ['ngRoute', 'ngFileUpload', 'bootstrapLightbox']);

artApp.config(function (LightboxProvider) {
    // set a custom template
    LightboxProvider.templateUrl = 'template/modal.html';

    // our images array is not in the default format, so we have to write this
    // custom method
    LightboxProvider.getImageUrl = function (imageUrl) {
        return 'images/img/' + imageUrl.src;
    };

    // set the caption of each image as its text color
    //LightboxProvider.getImageCaption = function (imageUrl) {
    //    return '#' + imageUrl.src.match(/00\/(\w+)/)[1];
    //};

    // increase the maximum display height of the image
    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
        return {
            'maxWidth': dimensions.windowWidth >= 768 ? // default
            dimensions.windowWidth - 92 :
            dimensions.windowWidth - 52,
            'maxHeight': 1600                           // custom
        };
    };

    // the modal height calculation has to be changed since our custom template is
    // taller than the default template
    LightboxProvider.calculateModalDimensions = function (dimensions) {
        var width = Math.max(400, dimensions.imageDisplayWidth + 32);

        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
            width = 'auto';
        }

        return {
            'width': width,                             // default
            'height': 'auto'                            // custom
        };
    };
});


//var app = angular.module('app', []);
//app.run(function ($rootScope, $location, $cookieStore, AuthService) {
//    $rootScope.$on("$routeChangeStart", function (event, next, current) {
//        if (next.authenticate) {
//            if (!AuthService.isAuthenticated()) {
//                $location.url("/Login");
//            }
//        }
//
//
//app.factory('AuthService', function ($http, $q, $window, $cookieStore) {
//    var factory = {};
//    var loginUrl = 'http://gallery.com/#/login';
//    var authUrl = 'http://gallery.com/#/login';
//    var email;
//    var token;
//    factory.Authenticate = function (email, password) {
//        console.log("AuthService -" + email);
//        var deferred = $q.defer();
//        var user = {
//            email: window.btoa(email),
//            password: window.btoa(password)
//        };
//        $http({
//            method: 'POST',
//            url: loginUrl,
//            data: user
//        }).success(function (data) {
//            console.log("AuthService - " + data);
//            token = data.replace('"', '').replace('"', '');
//            email = user.email;
//            deferred.resolve(token);
//            $cookieStore.put('token', token);
//            $cookieStore.put('email',user.email);
//        }).error(function () {
//            deferred.reject();
//        });
//        return deferred.promise;
//    };
//    factory.Email = email;
//    factory.Token = token;
//    factory.isAuthenticated = function () {
//        var request = $http({
//            method: 'GET',
//            url: authUrl,
//            headers: { 'Authorization': 'Token '+ $cookieStore.get('email') + ":"+ $cookieStore.get('token') }
//        }).then(function () {
//                return true;
//            }
//            ,function () {
//                return false;
//            });
//    };
//    return factory;
//
//});







//artApp.module('myApp.auth')
//artApp.service('SessionService', ['$injector', function($injector) {
//
//            this.checkAccess = function(event, toState, toParams, fromState, fromParams) {
//                var $scope = $injector.get('$rootScope'),
//                    $sessionStorage = $injector.get('$sessionStorage');
//
//                if (toState.data !== undefined) {
//                    if (toState.data.noLogin !== undefined && toState.data.noLogin) {
//                        // если нужно, выполняйте здесь какие-то действия
//                        // перед входом без авторизации
//                    }
//                } else {
//                    // вход с авторизацией
//                    if ($sessionStorage.user) {
//                        $scope.$root.user = $sessionStorage.user;
//                    } else {
//                        // если пользователь не авторизован - отправляем на страницу авторизации
//                        event.preventDefault();
//                        $scope.$state.go('auth.login');
//                    }
//                }
//            };
//        }
//    ]);
//
//angular.module('myApp', ['myApp.auth', 'ngRoute','ngStorage'])
//artApp.run(['$rootScope', '$state', '$stateParams', 'SessionService',
//        function ($rootScope, $state, $stateParams, SessionService) {
//            console.log('\n$rootScope');
//            console.log($rootScope);
//            console.log('\n$state');
//            console.log($state);
//            console.log('\n$stateParams');
//            console.log($stateParams);
//
//
//            $rootScope.$state = $state;
//            $rootScope.$stateParams = $stateParams;
//
//            $rootScope.user = null;
//
//            // Здесь мы будем проверять авторизацию
//            $rootScope.$on('$stateChangeStart',
//                function (event, toState, toParams, fromState, fromParams) {
//                    console.log('\nevent');
//                    console.log(event);
//                    console.log('\ntoState');
//                    console.log(toState);
//                    console.log('\ntoParams');
//                    console.log(toParams);
//                    console.log('\nfromState');
//                    console.log(fromState);
//                    SessionService.checkAccess(event, toState, toParams, fromState, fromParams);
//                }
//            );
//        }
//    ]);


















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