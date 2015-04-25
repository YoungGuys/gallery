'use strict';

artApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    $routeProvider
        .when('/', {
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })
        .when('/add-artist', {
            templateUrl: 'template/add-artists.html',
            controller: 'addArtistsCtrl'
        })
        .when('/add-jury', {
            templateUrl: 'template/add-jury.html',
            controller: 'addJuryCtrl'
        })
        .when('/add-project', {
            templateUrl: 'template/add-project.html',
            controller: 'addProjectCtrl'
        })
        .when('/artist', {
            templateUrl: 'template/artist.html',
            controller: 'artistCtrl'
        })
        .when('/artist-list', {
            templateUrl: 'template/artist-list.html',
            controller: 'artistListCtrl'
        })
        .when('/edit-artists', {
            templateUrl: 'template/edit-artists.html',
            controller: 'editArtistsCtrl'
        })
        .when('/edit-jury', {
            templateUrl: 'template/edit-jury.html',
            controller: 'editJuryCtrl'
        })
        .when('/edit-project', {
            templateUrl: 'template/edit-project.html',
            controller: 'editProjectCtrl'
        })
        .when('/jury-artist', {
            templateUrl: 'template/jury-artist.html',
            controller: 'juryArtistCtrl'
        })
        .when('/jury-artists', {
            templateUrl: 'template/jury-artists.html',
            controller: 'juryArtistsCtrl'
        })
        .when('/jury-main', {
            templateUrl: 'template/jury-main.html',
            controller: 'juryMainCtrl'
        })
        .when('/jury-project', {
            templateUrl: 'template/jury-project.html',
            controller: 'juryProjectCtrl'
        })
        .when('/jury-selected', {
            templateUrl: 'template/jury-selected.html',
            controller: 'jurySelectedCtrl'
        })
        .when('/jury-list', {
            templateUrl: 'template/jury-list.html',
            controller: 'juryListCtrl'
        })
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })
        .when('/main', {
            templateUrl: 'template/main.html',
            controller: 'mainCtrl'
        })
        .when('/project', {
            templateUrl: 'template/project.html',
            controller: 'projectCtrl'
        })
        .when('/rating', {
            templateUrl: 'template/rating.html',
            controller: 'ratingCtrl'
        })
        .when('/registration', {
            templateUrl: 'template/registration.html',
            controller: 'registrationCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });

    //$locationProvider.html5Mode(true);
}]);