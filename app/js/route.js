'use strict';

artApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    $routeProvider
        .when('/', {
            templateUrl: 'template/main.html',
            controller: 'loginCtrl'
        })

        //artist
        .when('/artist/:id', {
            templateUrl: 'template/artist.html',
            controller: 'artistCtrl'
        })
        .when('/artist-list', {
            templateUrl: 'template/artist-list.html',
            controller: 'artistListCtrl'
        })
        .when('/add-artist', {
            templateUrl: 'template/add-artist.html',
            controller: 'addArtistCtrl'
        })
        .when('/edit-artist/:id', {
            templateUrl: '../template/edit-artist.html',
            controller: 'editArtistCtrl'
        })

        //jury
        .when('/add-jury', {
            templateUrl: 'template/add-jury.html',
            controller: 'addJuryCtrl'
        })
        .when('/edit-jury/:id', {
            templateUrl: 'template/edit-jury.html',
            controller: 'editJuryCtrl'
        })
        .when('/jury-list', {
            templateUrl: 'template/jury-list.html',
            controller: 'juryListCtrl'
        })
        .when('/jury-selected/:id', {
            templateUrl: 'template/jury-selected.html',
            controller: 'jurySelectedCtrl'
        })

        //project
        .when('/add-project/', {
            templateUrl: 'template/add-project.html',
            controller: 'addProjectCtrl'
        })
        .when('/edit-project/:id', {
            templateUrl: 'template/edit-project.html',
            controller: 'editProjectCtrl'
        })
        .when('/project/:id', {
            templateUrl: 'template/project.html',
            controller: 'projectCtrl'
        })
        .when('/project-list', {
            templateUrl: 'template/project-list.html',
            controller: 'projectsCtrl'
        })

        //autorization
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })
        .when('/admin', {
            templateUrl: 'template/admin.html',
            controller: 'adminCtrl'
        })

        //page
        .when('/main', {
            templateUrl: 'template/main.html',
            controller: 'mainCtrl'
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