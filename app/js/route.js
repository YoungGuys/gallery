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
            templateUrl: 'template/add-artist.html',
            controller: 'addArtistCtrl'
        })
        .when('/add-jury', {
            templateUrl: 'template/add-jury.html',
            controller: 'addJuryCtrl'
        })
        .when('/add-project/', {
            templateUrl: 'template/add-project.html',
            controller: 'addProjectCtrl'
        })
        .when('/artist/:id', {
            templateUrl: 'template/artist.html',
            controller: 'artistCtrl'
        })
        .when('/artist-list', {
            templateUrl: 'template/artist-list.html',
            controller: 'artistListCtrl'
        })
        .when('/edit-artist', {
            templateUrl: '../template/edit-artist.html',
            controller: 'editArtistCtrl'
        })
        .when('/edit-jury/:id', {
            templateUrl: 'template/edit-jury.html',
            controller: 'editJuryCtrl'
        })
        .when('/edit-project/:id', {
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
        .when('/admin', {
            templateUrl: 'template/admin.html',
            controller: 'adminCtrl'
        })
        .when('/main', {
            templateUrl: 'template/main.html',
            controller: 'mainCtrl'
        })
        .when('/project/:id', {
            templateUrl: 'template/project.html',
            controller: 'projectCtrl'
        })
        .when('/projects', {
            templateUrl: 'template/projects.html',
            controller: 'projectsCtrl'
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