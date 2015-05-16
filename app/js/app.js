'use strict';

/* App Module */
var artApp = angular.module('artApp', ['ngRoute', 'ngFileUpload', 'ngCookies', 'bootstrapLightbox']);

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
artApp.run(function ($rootScope, $location, $cookieStore) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        //if (next.authenticate) {
        if (!$cookieStore.get('authorization')) {
            //if (!AuthService.isAuthenticated()) {
                $location.url("/login");
        }
        else {
            if (!$rootScope.userName) {

                $rootScope.jury = $cookieStore.get('jury');
                $rootScope.admin = $cookieStore.get('admin');
                $rootScope.idJury = $cookieStore.get('idJury');
                $rootScope.userName = $cookieStore.get('login');

            }
        }
    });
});
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




