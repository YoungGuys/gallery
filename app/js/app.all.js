'use strict';

/* App Module */
var artApp = angular.module('artApp', ['ngRoute']);

//var URL = "http://gallery.com/";
var URL = location.host;

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
        .when('/edit-artist', {
            templateUrl: '../template/edit-artist.html',
            controller: 'editArtistCtrl'
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
'use strict';

artApp.controller('addArtistsCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('addJuryCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.addJury = function () {

        var data = {
            login: $scope.login,
            pass:  $scope.pass,
            fio:   $scope.fio,
            bio:   $scope.bio,
            photo: $scope.photo
        };
        console.log (data);

        $http.post('api/post/addjury', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });
    };



}]);

'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.addProject = function () {

        var data = {
            name: $scope.name,
            artist: $scope.artist,
            info: $scope.info,
            file1: $scope.file1,
            file2: $scope.file2,
            file3: $scope.file3,
            file4: $scope.file4
        };
        console.log (data);

        $http.post('api/post/', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };

}]);
'use strict';

artApp.controller('artistListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.post('api/post/artist', data)
        .success(function(data, status, headers, config) {
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


}]);
'use strict';

artApp.controller('artistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.painter = {
        name: "MiKolka",
        photo: "img.jpg",
        bio: "student"
    };

    $scope.painterProjects = [
        {
            photo: "img.jpg",
            name: "project1",
            id: "1"
        },
        {
            photo: "img.jpg",
            name: "project2",
            id: "2"
        }
    ];

    $scope.deleteProject = function () {
        var remove = confirm('Видалити проект?');

        if (remove) {
            $http.post('api/post/deleteProject', data)
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });
        }
    }

}]);
'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.editPainter = function () {
        $http.post('api/post/artist', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });
    }


}]);
'use strict';

artApp.controller('editJuryCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    //name
    //pass
    //info
    //photo

    $scope.updateJury = function () {

        var data = {
            name: $scope.name,
            pass: $scope.pass,
            info: $scope.info,
            photo: $scope.photo
        };

        $http.post('api/post/editjury', data)
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
    };

}]);
'use strict';

artApp.controller('editProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.saveChange = function () {

    };


    $scope.addPhoto = function (el) {
        $scope.project.photo.push("");
    };


    $scope.changePhoto = function (el) {
        console.log('sd');
    };

    $scope.project = {
        photo: [
            "1",
            "2",
            "3"
        ]
    };

}]);
'use strict';

artApp.controller('juryArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('juryArtistsCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('juryListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('juryMainCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('juryProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


}]);
'use strict';

artApp.controller('jurySelectedCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.autorization = function () {
        if ($scope.formLogin.$valid) {
            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            $http.post('api/get/autorization', data)
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };

}]);
'use strict';

artApp.controller('mainCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

}]);
'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    //name
    //photo
    //bio
    //description
    //projectName
    //projectPhoto
    //prevProject
    //nextProject

}]);
'use strict';

artApp.controller('ratingCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.currentDate = new Date();

    $scope.painters = [
        {
            name: "MiKolka",
            place: "1",
            project: {
                id: "1",
                name: "Project-1",
                photo: "img.jpg",
                vote: "3"
            }
        },
        {
            name: "Andii",
            place: "2",
            project: {
                id: "2",
                name: "Project-2",
                photo: "img.jpg",
                vote: "2"
            }
        }
    ];


    $scope.allJury = [
        {
            photo: "img.jpg",
            name: "Jury-1",
            projects: [
                {
                    id: 1,
                    name: "Project-1"
                },
                {
                    id: 2,
                    name: "Project-2"
                },
                {
                    id: 3,
                    name: "Project-3"
                }
            ]
        },
        {
            photo: "img.jpg",
            name: "Jury-2",
            projects: [
                {
                    id: 1,
                    name: "Project-1"
                },
                {
                    id: 2,
                    name: "Project-2"
                }
            ]
        },
        {
            photo: "img.jpg",
            name: "Jury-3",
            projects: [{}]
        }
    ];
    //jury.
    //jury.
    //jury.

}]);

'use strict';

artApp.controller('registrationCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.tab = 1;
    $scope.district = false;


    $scope.user = {};
    $scope.projects = [{}];
    $scope.members = [{}];

    $scope.addProjects = function(){
        console.log('Add project');
        $scope.projects.push($scope.project);
    };

    $scope.addMember = function(){
        console.log('Add member');
        $scope.members.push($scope.member);
    };




    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
        $scope.tab = setTab;
    };


    $http.get('template/country.json').success(function(data){
        $scope.country = data;
        //console.log($scope.country);
    });


    $scope.changeCountry = function () {
        console.log($scope.user.country);
        if ($scope.user.country === 'Україна') {
            $scope.district = true;

            $http.get('template/ukraine-district.json').success(function(data){
                $scope.ukraineDistrict = data;
                //console.log($scope.country);
            });

        }
        else {
            $scope.district = false;
        }
    };


    //var arrDay = [];
    //
    //for (var i = 1; i <= 31; i ++) {
    //    arrDay[i] = i;
    //}
    //
    //$scope.arrayDay = arrDay;
    //
    //$scope.arrayMonth = [
    //      "Січня"
    //    , "Лютого"
    //    , "Березня"
    //    , "Квітня"
    //    , "Травня"
    //    , "Червня"
    //    , "Липня"
    //    , "Серпня"
    //    , "Вересня"
    //    , "Жовтня"
    //    , "Листопада"
    //    , "Грудня"
    //];
    //
    //$scope.arrayYear = [
    //      1979
    //    , 1980
    //    , 1981
    //    , 1982
    //    , 1983
    //    , 1984
    //    , 1985
    //    , 1986
    //    , 1987
    //    , 1988
    //    , 1989
    //    , 1990
    //    , 1991
    //    , 1992
    //    , 1993
    //    , 1994
    //    , 1995
    //    , 1996
    //    , 1997
    //    , 1998
    //    , 1999
    //    , 2000
    //];


    $scope.exhibitionCh = function() {
        //alert($scope.user.exhibition);
        if ($scope.user.exhibition === 'true') {
            $scope.exhibitionShow = true;
        }
        else {
            $scope.exhibitionShow = false;
        }
    };

    $scope.types = [
          "Живопис"
        , "Скульптура"
        , "Фотографія"
        , "Відео"
        , "Інсталяція"
        , "Графіка"
        , "Змішана техніка"
        , "Інше"
        , "Перформанс"
    ];


    $scope.anotherPersonFn = function() {
        alert($scope.project.anotherPerson);
        //if ($scope.project.anotherPerson === 'true') {
        //    $scope.anotherPersonShow = true;
        //}
        //else {
        //    $scope.anotherPersonShow = false;
        //}
    };

    $scope.submit = function() {
        console.log('submit');
        console.log($scope.user);
        if ( $scope.registrForm.$valid ) {
            alert('valid');
            //$http.post( 'ajax.php', $scope.user ).success(function( res ){
            //    if ( res.res=='ok') {
            //        $scope.user = {};
            //        $scope.form.$setPristine();
            //        alert('Сообщение отправлено');
            //    } else {
            //        alert('Возникла ошибка');
            //    }
            //}).error(function(err){
            //    alert(err);
            //});
        }
    }

    $scope.applicationType = function () {
        if ($scope.user.type === "individual") {
            $scope.individualShow = true;
            $scope.collectiveShow = false;
        }
        else {
            $scope.individualShow = false;
            $scope.collectiveShow = true;

        }
    }
}]);

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
'use strict';

/* Filters */

'use strict';

/* Services */

