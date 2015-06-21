'use strict';

artApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    //$locationProvider.html5Mode({
    //    enabled: true,
    //    requireBase: false
    //});

    $routeProvider
        //.when('/', {
        //    templateUrl: 'template/main.html',
        //    controller: 'loginCtrl'
        //})

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

        //expert
        .when('/add-expert', {
            templateUrl: 'template/add-jury.html',
            controller: 'addJuryCtrl'
        })
        .when('/edit-expert/:id', {
            templateUrl: 'template/edit-jury.html',
            controller: 'editJuryCtrl'
        })
        .when('/expert-list', {
            templateUrl: 'template/jury-list.html',
            controller: 'juryListCtrl'
        })
        .when('/expert-selected/:id', {
            templateUrl: 'template/jury-selected.html'
            //controller: 'jurySelectedCtrl'
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
            controller: 'projectListCtrl'
        })

        //autorization
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'loginCtrl'
        })

        //page
        .when('/main', {
            templateUrl: 'template/main.html',
            controller: 'mainCtrl'
        })
        .when('/home', {
            templateUrl: 'template/home.html'
            //controller: 'homeCtrl'
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
            redirectTo: '/main'
        });

}]);