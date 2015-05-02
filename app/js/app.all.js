'use strict';

var isOnGitHub = window.location.hostname === 'blueimp.github.io',
    url = isOnGitHub ? '//jquery-file-upload.appspot.com/' : 'server/php/';

/* App Module */
var artApp = angular.module('artApp', ['ngRoute', 'ngFileUpload']);





artApp.controller('uploadFileCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    console.log($scope.files);
    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.log = '';


    $scope.deleteImg = function (index) {
        $scope.files.splice(index, 1);
    };


    $scope.upload = function (files) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                Upload.upload({
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    //fields: {
                    //    'username': $scope.username
                    //},
                    //file: file
                    url: 'http://gallery.com/core/upload-image.php',
                    headers: {'Content-Type': file.type},
                    method: 'POST',
                    data: file,
                    file: file,

                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                    evt.config.file.name + '\n' + $scope.log;

                }).success(function (data, status, headers, config) {
                    $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + data + '\n' + $scope.log;


                if (files.length == 1 && !$scope.multipleUpload) {
                    $scope.photo = files[0].name;
                }
                else {
                    $scope.photo = [];
                    for (var i = 0; i < files.length; i++) {
                        $scope.photo[i] = files[i].name;
                    }
                }


                });
            }

        }
    };




}]);


//var URL = "http://gallery.com/";
//var URL = location.host;

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
'use strict';

artApp.controller('addArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.multipleUpload = false;


    $scope.addPainter = function () {

        //if ($scope.formAddPainter.$valid && $scope.photo) {

        if ($scope.formAddPainter.$valid) {

            var data = {
                fio_eng: $scope.name,
                bio: $scope.bio,
                photo: $scope.photo || null
            };
            console.log(data);

            $http.get('api/post/addArtist', {params: data})
                .success(function (data, status, headers, config) {
                    console.log(data);

                    if (data) {
                        $scope.name = null;
                        $scope.bio = null;
                        $scope.photo = null;
                        $scope.files = null;
                    }
                })
                .error(function (data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };


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
        console.log(data);

        $http.get('/api/post/addjury', {params: data})
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


    $scope.multipleUpload = true;

    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            $scope.painters = data;

        });


    $scope.addProject = function () {

        if ($scope.project.id_user == "null") {
            alert('Choose painter!');
            return false;
        }

        var data = {
            id_user:         $scope.project.id_user,
            title_eng:       $scope.project.name,
            description_eng: $scope.project.description,
            photo:           $scope.photo
        };
        console.log(data);

        $http.get('api/post/project', {params: data})
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };

}]);
'use strict';

artApp.controller('loginCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.autorization = function () {
        if ($scope.formLogin.$valid) {
            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            $http.post('api/get/admin', {params: data})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    //location.href = '#/jury-main';
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };

}]);
'use strict';

artApp.controller('artistListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/allusers', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.painters = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deletePainter = function (id, index) {

        if (confirm('Delete painter?')) {

            $http.post('api/delete/user', {params: id})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    if (data) {
                        $('.js-lsit tr').eq(index).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }


    }


}]);
'use strict';

artApp.controller('artistCtrl',['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {


    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
        $scope.tab = setTab;
    };


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_user == $routeParams.id ) {
                    $scope.painter = item;
                    return false;
                }
            });

        });



    $http.get('api/get/artistprojects', {params: {artist: $routeParams.id} })
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                item.prevProject = data.length == i + 1 ? 0 : i + 1;
                item.nextProject = data.length == i + 1 ? 0 : i + 1;
            });

            $scope.projects = data;

        });


    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        $http.post('api/post/rating', {parse: data})
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };


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

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                if (data[i].id_jury == $routeParams.id) {
                    $scope.painter = data[i];
                    $scope.photo = $scope.data.photo;
                    console.log($scope.files);
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.updatePainter = function () {

        if ($scope.formEditJury.$valid) {

            var data = {
                id_user: $routeParams.id,
                fio: $scope.painter.fio,
                bio: $scope.painter.bio,
                photo: $scope.photo
            };

            console.log(data);
            $http.get('api/put/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
        $scope.files = null;
    };

}]);
'use strict';

artApp.controller('editJuryCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log(data);

            for (var i = 0; i < data.length; i++) {
                if (data[i].id_jury == $routeParams.id) {
                    $scope.data = data[i];
                    $scope.data.pass = null;
                    $scope.photo = $scope.data.photo;
                    //$scope.files = [];
                    //$scope.files[0] = $scope.data.photo;
                    console.log($scope.files);
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.updateJury = function () {

        if ($scope.formEditJury.$valid) {

            if (!$scope.data.login) {
                alert('Enter login');
                return false;
            }
            else if (!$scope.data.pass) {
                alert('Enter password');
                return false;
            }

            var data = {
                id_jury: $scope.data.id_jury,
                fio: $scope.data.fio,
                login: $scope.data.login,
                pass: $scope.data.pass,
                bio: $scope.data.bio,
                photo: $scope.photo
            };

            console.log(data);
            $http.get('api/put/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    };


    $scope.removePhoto = function () {
        $scope.photo = null;
        $scope.files = null;
    };


}]);
'use strict';

artApp.controller('editProjectCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log(data);

            $scope.painters = data;

        });

    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project == $routeParams.id ) {
                    $scope.project = item;
                    $scope.photo = item.photo;
                    return false;
                }
            });

        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.saveChange = function () {

        if ($scope.project.id_user == null) {
            alert('Choose an painter!');
            return false;
        }

        var data = {
            id_project: $routeParams.id,
            id_user: $scope.project.id_user,
            title_eng: $scope.project.title_eng,
            description_eng: $scope.project.description_eng,
            photo: $scope.photo
        };
        console.log(data);


        $http.put('api/put/project', {params: data })
            .success(function(data, status, headers, config) {
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('NOT OK')
            });

    };



}]);
'use strict';

artApp.controller('juryListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            $scope.jury = data;
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deleteJury = function(id, index) {

        if (!confirm('Ви дійсно бажаєте видалити журі?')) {
            return false;
        }

        var data = {'id_jury': id};
        $http.get('api/delete/jury', {params: data})
            .success(function(data, status, headers, config) {
                console.log(data);
                if (data) {
                    $('.js-juryList tr').eq(index).hide(300);
                }
            });
    }

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

            $http.get('api/get/jury', {params: data})
                .success(function(data, status, headers, config) {
                    console.log(data);

                    if (data[0].login == $scope.login) {
                        location.href = '#/main';
                    }

                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }
    };

}]);
'use strict';

artApp.controller('mainCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });

}]);
'use strict';

artApp.controller('projectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project == $routeParams.id ) {
                    $scope.project = item;
                    return false;
                }
            });

        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });

    //title_eng
    //photo
    //description
    //projectName
    //projectPhoto
    //prevProject
    //nextProject

}]);
'use strict';

artApp.controller('projectsCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log(data);
            $scope.projects = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deleteProject = function (id, index) {

        if (confirm('Delete project?')) {

            $http.post('api/delete/project', {params: id})
                .success(function(data, status, headers, config) {
                    console.log(data);
                    if (data) {
                        $('.js-listProject tr').eq(index).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    }

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


artApp.directive('uploadFile', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/upload-file.html',
        controller: 'uploadFileCtrl'
    }
});


//artApp.directive('uploadFileBtn', function() {
//    return {
//        restrict: 'E',
//        templateUrl: 'template/upload-file-btn.html',
//        controller: 'FileDestroyController'
//    }
//});
'use strict';

/* Filters */

'use strict';

/* Services */

