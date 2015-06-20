'use strict';

/* App Module */
var artApp = angular.module('artApp',
    [
        'ngRoute',
        'ngFileUpload',
        'ngCookies',
        'ngAnimate',
        'chieffancypants.loadingBar'
    ]);


artApp.config(function(cfpLoadingBarProvider) {
    // true is the default, but I left this here as an example:
    cfpLoadingBarProvider.includeSpinner = true;
});

//
//artApp.config(function (LightboxProvider) {
//    // set a custom template
//    LightboxProvider.templateUrl = 'template/modal.html';
//
//    // our images array is not in the default format, so we have to write this
//    // custom method
//    LightboxProvider.getImageUrl = function (imageUrl) {
//        return 'images/img/' + imageUrl.src;
//    };
//
//    // set the caption of each image as its text color
//    //LightboxProvider.getImageCaption = function (imageUrl) {
//    //    return '#' + imageUrl.src.match(/00\/(\w+)/)[1];
//    //};
//
//    // increase the maximum display height of the image
//    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
//        return {
//            'maxWidth': dimensions.windowWidth >= 768 ? // default
//            dimensions.windowWidth - 92 :
//            dimensions.windowWidth - 52,
//            'maxHeight': 1600                           // custom
//        };
//    };
//
//    // the modal height calculation has to be changed since our custom template is
//    // taller than the default template
//    LightboxProvider.calculateModalDimensions = function (dimensions) {
//        var width = Math.max(400, dimensions.imageDisplayWidth + 32);
//
//        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
//            width = 'auto';
//        }
//
//        return {
//            'width': width,                             // default
//            'height': 'auto'                            // custom
//        };
//    };
//});


artApp.run(function ($rootScope, $location, $cookieStore) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        var url = $location.path().split('/')[1];

        if (url === 'registration') {
            return false;
        }

        if (!$cookieStore.get('authorization')) {
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
'use strict';

artApp.controller('addArtistCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.multipleUpload = false;


    $scope.addPainter = function () {

        if (!$scope.formAddPainter.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }


        $scope.painter.photo = $scope.photo || null;

        console.log($scope.painter);

        $http.get('api/post/addArtist', {params: $scope.painter})
            .success(function (data, status, headers, config) {
                console.log('\nAnswer add artist');
                console.log(data);

                if (data) {
                    $scope.painter = {};
                    $scope.photo = [];

                    $scope.status = "success";
                    $scope.message = "Successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "Error";
                }

            })
            .error(function (data, status, headers, config) {
                console.log('Answer add artist "Error"')
            });

    };


}]);



'use strict';

artApp.controller('addJuryCtrl',['$scope','$http', function($scope, $http) {

    $scope.jury = {};

    $scope.addJury = function () {

        console.log($scope.formAddJury);
        console.log($scope.formAddJury.$valid);

        if (!$scope.formAddJury.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }

        $scope.jury.photo = $scope.photo;
        console.log($scope.jury);

        $http.get('/api/post/addjury', {params: $scope.jury})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer add jury');
                console.log(data);

                if (data) {
                    $scope.jury = {};
                    $scope.photo = [];

                    $scope.status = "success";
                    $scope.message = "Successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "Error";
                }
            })
            .error(function(data, status, headers, config) {
                console.log('\nAnswer add jury "Error"')
            });
    };



}]);

'use strict';

artApp.controller('addProjectCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $scope.multipleupload = true;

    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nall users');
            console.log(data);

            $scope.painters = data;

        });


    $scope.addProject = function () {

        if (!$scope.formAddProject.$valid) {
            $scope.status = "danger";
            $scope.message = "Please complete all fields";
            return false;
        }

        if ($scope.project.id_user == "null") {
            $scope.status = "danger";
            $scope.message = "error";
            return false;
        }

        $scope.project.photos = $scope.photo;

        $scope.project = {"json": JSON.stringify($scope.project)};

        console.log('\nsend server data add project');
        console.log($scope.project);

        $http.get('api/post/project', {params: $scope.project})
            .success(function(data, status, headers, config) {
                console.log('\nanswer add project');
                console.log(data);

                if (data) {
                    $scope.project = {};
                    $scope.photo = [];
                    $scope.status = "success";
                    $scope.message = "successfully";
                }
                else {
                    $scope.status = "danger";
                    $scope.message = "error";
                }
            })
            .error(function(data, status, headers, config) {
                console.log('\nanswer add project "error"')
            });

    };

}]);
'use strict';

artApp.controller('alertCtrl',['$scope', '$timeout', function($scope, $timeout) {

    $scope.$watch('status', function () {

        $timeout(function(){
            $scope.status = false;
        }, 4000);

    });


}]);
'use strict';

artApp.controller('artistListCtrl',['$scope','$http', function($scope, $http) {


    $http.get('api/get/allusers', {params: null})
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;
        })
        .error(function(data, status, headers, config) {
            console.log('NOT OK')
        });


    $scope.deletePainter = function (id, i) {

        if (confirm('Delete painter?')) {

            var data = {
                id_user: id
            };

            $http.get('api/delete/user', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete user');
                    console.log(data);

                    if (data) {
                        $('.js-lsit tr').eq(i).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });

        }


    }


}]);
'use strict';

artApp.controller('artistCtrl',['$scope', '$rootScope', '$http', '$routeParams', function($scope, $rootScope, $http, $routeParams) {

    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {
        $scope.tab = setTab;
    };


    $http.get('api/get/user', {params: {id_user: $routeParams.id}} )
        .success(function(data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            if (data) $scope.painter = data;

        });


    $http.get('api/get/artistProjects', {params: {artist: $routeParams.id} })
        .success(function(data, status, headers, config) {
            console.log('\nArtist projects');
            console.log(data);

            if (data) {
                data.forEach(function(item, i){
                    item.prevProject = data.length == i + 1 ? 0 : i + 1;
                    item.nextProject = data.length == i + 1 ? 0 : i + 1;
                });
            }

            $scope.projects = data;

            if ($scope.projects.length > 1) $scope.btnVisible = true;

        });


    $http.get('api/get/myRateProject')
        .success(function(data, status, headers, config) {
            console.log('\nJury rate project');
            console.log(data);
            console.log($scope.projects);

            for (var i in data) {

                if (data[i].id_jury == $rootScope.idJury) {

                    for (var j in $scope.projects) {

                        if ($scope.projects[j].id_project == data[i].id_project) {

                            $scope.projects[j].rate = true;
                            console.log($scope.projects[j].rate);

                        }

                    }

                }

            }
        });


    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        if ($scope.rate) {
            $http.get('api/delete/rate', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete rating');
                    console.log(data);
                    if (data) $scope.rate = false;
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer delete rating "Error"');
                });
        }
        else {
            if ($scope.deleteRepeatRating) {

                $http.get('api/put/deleteRepeat', { params: {
                    id_project: id,
                    id_jury: $scope.idJury
                }})
                    .success(function(data, status, headers, config) {
                        console.log('\ndeleteRepeat');
                        console.log(data);  // -> null

                        $scope.rate = true;
                    });
            }
            else {
                $http.get('api/post/rating', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nAnswer add rating');
                        console.log(data);

                        if (data) $scope.rate = true;
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Answer add rating "Error"');
                    });
            }

        }

    };


    $scope.deleteProject = function (id, i) {
        var remove = confirm('Remove project?');

        if (remove) {

            var data = {
                id_project: id
            };

            $http.get('api/delete/project', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('Answer delete project');
                    console.log(data);

                    if (data) {
                        $('.js-listProject tr').eq(i).hide(300);
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log('NOT OK')
                });
        }

    };




}]);
'use strict';

artApp.controller('editArtistCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/user', {params: {id_user: $routeParams.id}})
        .success(function (data, status, headers, config) {
            console.log('\nUser id = ' + $routeParams.id);
            console.log(data);

            $scope.painter = data;
            $scope.photo = [];
            $scope.photo[0] = data.photo;

        });


    $scope.updatePainter = function () {

        if ($scope.formEditPainter.$valid) {

            var data = $scope.painter;

            data.id_user = $routeParams.id;
            data.photo = $scope.photo[0];

            console.log(data);
            $http.get('api/put/user', {params: data})
                .success(function (data, status, headers, config) {
                    console.log(data);

                    if (data) {
                        $scope.status = "success";
                        $scope.message = "Successfully";
                    }
                    else {
                        $scope.status = "danger";
                        $scope.message = "Error";
                    }

                })
                .error(function (data, status, headers, config) {
                    console.log('NOT OK')
                });

        }

    };


}]);
'use strict';

artApp.controller('editJuryCtrl',['$scope','$http', '$routeParams', function($scope, $http, $routeParams) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            //for (var i = 0; i < data.length; i++) {
            for (var i in data) {
                if (data[i].id_jury == $routeParams.id) {
                    $scope.data = data[i];
                    $scope.data.pass = null;
                    $scope.photo[0] = [];
                    $scope.photo[0] = $scope.data.photo;

                    console.log($scope.data);
                }
            }
        })
        .error(function(data, status, headers, config) {
            console.log('All jury error')
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
            console.log('\nUpdate jury');
            console.log(data);

            $http.get('api/put/jury', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer update jury');
                    console.log(data);
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer update jury "Error"')
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


    $scope.multipleUpload = true;


    $http.get('api/get/allusers')
        .success(function(data, status, headers, config) {
            console.log('\nAll users');
            console.log(data);

            $scope.painters = data;

        });


    $http.get('api/get/project', {params: {id_project: $routeParams.id} } )
        .success(function(data, status, headers, config) {
            console.log('\nProject id = ' + $routeParams.id);
            console.log(data);

            $scope.project = data.project;
            $scope.user = data.user;
            $scope.project.id_user = data.statement.id_user;

            $scope.photo = [];

            data.photos.forEach(function(item, i){
                $scope.photo[i] = item.src
            });

        });


    $scope.saveChange = function () {

        if ($scope.project.id_user == null) {
            alert('Choose an painter!');
            return false;
        }

        var data = $scope.project;

        data.id_project = $routeParams.id;
        data.photos = $scope.photo;

        data = {"json": JSON.stringify(data)};
        console.log('\nSend server data update project');
        console.log(data);


        $http.get('api/put/project', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer update project');
                console.log(data);
            })
            .error(function(data, status, headers, config) {
                console.log('\nAnswer update project "Error"')
            });

    };



}]);
'use strict';

artApp.controller('homeCtrl',['$scope','$http', '$routeParams', '$rootScope', function($scope, $http, $routeParams, $rootScope) {


    $scope.idJury = $routeParams.id || $rootScope.idJury;


    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            $scope.dataProjects = data;
            myRateProject();
        });


    //$http.get('api/get/juryProjects', {params: {id_jury: $scope.idJury}} )
    //    .success(function(data, status, headers, config) {
    //        console.log('\njuryProjects');
    //        console.log(data);
    //
    //        $scope.projects = [];
    //
    //        for (var i in data) {
    //            for (var j in $scope.dataProjects) {
    //                if (data[i].id_project == $scope.dataProjects[j].id_project) {
    //                    $scope.projects.push($scope.dataProjects[j]);
    //                }
    //            }
    //        }
    //        console.log($scope.projects);
    //    });



    $http.get('api/get/myRepeatProject')
        .success(function(data, status, headers, config) {
            console.log('\nmyRepeatProject');
            console.log(data);

            $scope.choseProjects = data;

            for (var i in data) {
                for (var j in $scope.dataProjects) {
                    if (data[i].id_project == $scope.dataProjects[j].id_project) {
                        $scope.choseProjects[i].photos = $scope.dataProjects[j].photos;
                    }
                }
            }

        });


    $scope.deleteRepeat = function (id, i) {
        $http.get('api/put/deleteRepeat', { params: {
            id_project: id,
            id_jury: $scope.idJury
        }})
            .success(function(data, status, headers, config) {
                console.log('\ndeleteRepeat');
                console.log(data);

                $scope.choseProjects.splice(i, 1);
                myRateProject();
            });
    };


    $scope.notChooseProject = function (id, i) {

        var data = {
            id_project: id
        };

        $http.get('api/delete/rate', {params: data} )
            .success(function(data, status, headers, config) {
                console.log('\nAnswer delete rating');
                console.log(data);

                if (data) $scope.deleteRepeat(id, i);
            })
    };


    $scope.chooseProject = function(id, i) {

        $scope.deleteRepeat(id, i);

    };


    function myRateProject () {
        $http.get('api/get/myRateProject')
            .success(function(data, status, headers, config) {
                console.log('\nMy rate project');
                console.log(data);

                $scope.projects = data;

                for (var i in data) {
                    for (var j in $scope.dataProjects) {
                        if (data[i].id_project == $scope.dataProjects[j].id_project) {
                            $scope.projects[i].photos = $scope.dataProjects[j].photos;
                        }
                    }
                }

            });
    }


}]);
'use strict';

artApp.controller('juryListCtrl',['$scope','$http', function($scope, $http) {


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);
            $scope.jury = data;
        });


    $scope.deleteJury = function(id, index) {

        if (!confirm('Ви дійсно бажаєте видалити журі?')) {
            return false;
        }

        var data = {'id_jury': id};

        $http.get('api/delete/jury', {params: data})
            .success(function(data, status, headers, config) {
                console.log('\nAnswer delete jury');
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

artApp.controller('loginCtrl',['$scope','$http', '$rootScope', '$cookieStore', '$location', function($scope, $http, $rootScope, $cookieStore, $location) {


    $scope.autorization = function () {

        if ($scope.formLogin.$valid) {

            var data = {
                login: $scope.login,
                pass: $scope.pass
            };

            if ($scope.login === 'admin') {

                $http.get('api/get/admin', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nAdmin autorization');
                        console.log(data);

                        if (data[0].login == 'admin') {

                            $cookieStore.put('authorization', true);
                            $cookieStore.put('admin', true);
                            $cookieStore.put('login', 'Admin');

                            $rootScope.admin = true;
                            $rootScope.userName = 'Admin';

                            $location.url('/main');

                        }
                        else {
                            _alert();
                        }
                    });

            }

            else {

                $http.get('api/get/jury', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nJury autorization');
                        console.log(data);

                        if (data.login == $scope.login) {

                            $cookieStore.put('authorization', true);
                            $cookieStore.put('admin', false);
                            $cookieStore.put('jury', true);
                            $cookieStore.put('login', data.login);
                            $cookieStore.put('idJury', data.id_jury);

                            $rootScope.admin = false;
                            $rootScope.jury = true;
                            $rootScope.idJury = data.id_jury
                            $rootScope.userName = data.login;

                            $location.url('/main');
                        }
                        else {
                            _alert();
                        }

                    })
                    .error(function(data, status, headers, config) {
                        console.log('Jury autorization Error')
                    });

            }

        }
    };


    function _alert() {
        $scope.alert = 'Incorrect login or password';

        setTimeout(function () {
            $scope.alert = '';
        }, 2000);
    }

}]);
'use strict';

artApp.controller('mainCtrl',['$scope','$rootScope', '$cookieStore', function($scope, $rootScope, $cookieStore) {


}]);
'use strict';

artApp.controller('projectListCtrl',['$scope','$http', '$location', function($scope, $http, $location) {


    $http.get('api/get/projects', {params: null})
        .success(function(data, status, headers, config) {
            console.log('\nProjects');
            console.log(data);

            $scope.projects = data;

        })
        .error(function(data, status, headers, config) {
            console.log('\nProjects error')
        });


    $scope.deleteProject = function (id, index) {

        if (confirm('Delete project?')) {

            $http.get('api/delete/project', {params: {id_project: id } })
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete project');
                    console.log(data);

                    if (data) {
                        $('.js-listProject tr').eq(index).hide(300);
                    }

                })
                .error(function(data, status, headers, config) {
                    console.log('Answer delete project "Error"')
                });

        }

    }

}]);

artApp.controller('projectCtrl',['$scope','$http', '$routeParams', '$rootScope', '$location', function($scope, $http, $routeParams, $rootScope, $location) {
    'use strict';

    $http.get('api/get/projects')
        .success(function(data, status, headers, config) {
            console.log('\nAll project');
            console.log(data);

            data.forEach(function(item, i){
                if ( item.id_project ==  $routeParams.id) {
                    $scope.project = item;

                    $scope.project.prevProject = i == 0 ? data[data.length - 1].id_project : data[i - 1].id_project;
                    $scope.project.nextProject = data.length == i + 1 ?  data[0].id_project : data[i + 1].id_project;

                    $scope.photos = $scope.project.photos; //fotorama directive

                    painter();

                    return false;
                }
            });

        });


    $http.get('api/get/myRepeatProject')
        .success(function(data, status, headers, config) {
            console.log('\nmyRepeatProject');
            console.log(data);

            $scope.choseProjects = data;

        });


    $http.get('api/get/alljury')
        .success(function(data, status, headers, config) {
            console.log('\nAll jury');
            console.log(data);

            for (var i in $scope.choseProjects) {

                if ($scope.choseProjects[i].id_project == $routeParams.id) {

                    $scope.deleteRepeatRating = true;
                    return false;

                }

            }

            for (var i in data) {

                if (data[i].login == $rootScope.userName) {

                    data[i].projects.forEach(function(item){

                        if (item.id_project == $routeParams.id) {
                            $scope.rate = true;
                        }

                    });

                }

            }

        })
        .error(function(data, status, headers, config) {
            console.log('All jury error')
        });


    $scope.chooseProject = function(id) {

        var data = {
            id_project: id
        };

        if ($scope.rate) {
            $http.get('api/delete/rate', {params: data} )
                .success(function(data, status, headers, config) {
                    console.log('\nAnswer delete rating');
                    console.log(data);
                    if (data) $scope.rate = false;
                })
                .error(function(data, status, headers, config) {
                    console.log('Answer delete rating "Error"');
                });
        }
        else {
            if ($scope.deleteRepeatRating) {

                $http.get('api/put/deleteRepeat', { params: {
                    id_project: id,
                    id_jury: $scope.idJury
                }})
                    .success(function(data, status, headers, config) {
                        console.log('\ndeleteRepeat');
                        console.log(data);  // -> null

                        $scope.rate = true;
                    });
            }
            else {
                $http.get('api/post/rating', {params: data} )
                    .success(function(data, status, headers, config) {
                        console.log('\nAnswer add rating');
                        console.log(data);

                        if (data) $scope.rate = true;
                    })
                    .error(function(data, status, headers, config) {
                        console.log('Answer add rating "Error"');
                    });
            }

        }

    };



    function painter () {
        $http.get('api/get/user', {
            params: {
                id_user: $scope.project.id_user
            }
        })
            .success(function(data, status, headers, config) {
                console.log('\nUser id = ' + $scope.project.id_user);
                console.log(data);

                if (data) $scope.painter = data;

            });
    }



}]);
'use strict';

artApp.controller('ratingCtrl',['$scope', '$rootScope', '$http', '$location', "$route", function($scope, $rootScope, $http, $location, $route) {

    $scope.currentDate = new Date();
    $scope.select = [];


    /*
        перевірка видимості рейтингу,
        if true, дані не загружаються
     */
    $http.get('api/get/ratingVisibility')
        .success(function(data, status, headers, config) {
            console.log('\nratingVisibility');
            console.log(data);

            $scope.ratingVisibility = (data == "false") ? false : true;

            if (!$scope.ratingVisibility || $rootScope.admin) apiData();
        });


    $scope.showRating = function () {
        $scope.ratingVisibility = $scope.ratingVisibility ? 0 : 1;

        $http.get(
            'api/put/settings', {
                params: {
                    "ratingVisibility": $scope.ratingVisibility
                }
            }
        )
            .success(function(data, status, headers, config) {
                console.log('\nRating setting');
                console.log(data);

                apiData();
            });

    };


    function apiData() {
        $http.get('api/get/alljury')
            .success(function(data, status, headers, config) {
                console.log('\nAll jury');
                console.log(data);
                $scope.allJury = data;
            });


        $http.get('api/get/projects', {params: null})
            .success(function(data, status, headers, config) {
                console.log('\nProjects');
                console.log(data);

                $scope.projects = data;
            });
    }


    $scope.selectMode = function () {
        $scope.selectProject = $scope.selectProject ? 0 : 1;
    };

    //$scope.selectProject = function (id) {
    //$scope.select.push(id)
    //};

    $scope.sendToVote = function () {
        var select = '';
        var n = $scope.select.length;

        $scope.select.forEach(function(item, i){

            if (item > 0) {
                select += item;
            }

            if (i < n - 1) {
                select += ',';
            }

        });

        $http.get('api/put/setRepeat', {params: {id_project: select} })
            .success(function(data, status, headers, config) {
                console.log('\nsendToVote');
                console.log(select);
                console.log(data);

                if (data) $route.reload();
            });
    };


}]);

'use strict';

artApp.controller('registrationCtrl',['$scope','$http', '$location', function($scope, $http, $location) {

    $scope.tab = 1;
    $scope.district = false;

    $scope.individualShow = true;


    $scope.user = {};
    $scope.projects = [{}];
    $scope.members = [{}];


    $scope.addProjects = function(){
        console.log('Add project');
        $scope.projects.push($scope.project);
    };


    $scope.removeProject = function(index){
        console.log('Remove project');
        console.log(index);

        console.log($scope.projects);
        for (var i = index; i < $scope.projects.length - 1; i++) {
            $scope.projects[i] = $scope.projects[i + 1]
        }

        $scope.projects.splice($scope.projects.length - 1, 1);
    };


    $scope.addMember = function(){
        console.log('Add member');
        $scope.members.push($scope.member);
    };

    $scope.removeMember = function(i){
        console.log('Remove member');
        $scope.members.splice(i, 1);
    };




    $scope.isSet = function(checkTab) {
        return $scope.tab === checkTab;
    };

    $scope.setTab = function(setTab) {

        if (!$scope.rulesModel) return false;

        $scope.tab = setTab;

    };


    $http.get('template/country.json').success(function(data){
        $scope.country = data;
        //console.log($scope.country);
    });


    //$scope.changeCountry = function (i) {
    //    console.log($scope.user.country);
    //    if ($scope.user.country === 'Україна') {
    //        $scope.district[i] = true;
    //
    //        $http.get('template/ukraine-district.json').success(function(data){
    //            $scope.ukraineDistrict = data;
    //            //console.log($scope.country);
    //        });
    //
    //    }
    //    else {
    //        $scope.district = false;
    //    }
    //};

    $http.get('template/ukraine-district.json').success(function(data){
            $scope.ukraineDistrict = data;
            //console.log($scope.country);
        });

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
    };

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




artApp.controller('uploadFileCtrl', ['$scope', 'Upload', function ($scope, Upload) {

    if (!$scope.photo) {
        $scope.photo = [];
    }

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.log = '';


    $scope.deleteImg = function(index) {

        if ( confirm('Deleted img?') ) {
            $scope.photo.splice(index, 1);
        }

    };


    $scope.upload = function(files) {

        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                var y = new Date().getFullYear();
                var m = new Date().getMonth() + 1;
                var d = new Date().getDate();
                var r = Math.round(Math.random() * 100);
                var date = y + m + d;

                var fileNameArray = file.name.split('.');
                var fileType = fileNameArray[fileNameArray.length - 1];

                var fileName = '';

                for (var k = 0; k < fileNameArray.length - 1; k++) {
                    fileName+= fileNameArray[k];
                }

                file.fileName = fileName + '-' + date + '-' + r + '.' + fileType;

                Upload.upload({
                    url: 'core/upload-image.php',
                    headers: {'Content-Type': file.type},
                    method: 'POST',
                    data: file,
                    file: file

                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);

                    $scope.log = 'progress: ' + progressPercentage + '% ' +
                    evt.config.file.fileName + '\n' + $scope.log;

                }).success(function (data, status, headers, config) {
                    //$scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + data + '\n' + $scope.log;

                    if (!$scope.multipleUpload) {
                        $scope.photo[0] = files[0].fileName;
                    }
                    else {
                        $scope.photo.push(config.file.fileName);
                    }

                });
            }

        }
    };


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
        templateUrl: 'template/menu.html',
        controller: function($scope, $rootScope, $location, $cookieStore) {

            var url = $location.path().split('/')[1];

            $scope.page = function (page) {
                return url == page ? 'active' : '';
            };

            $scope.exit = function() {
                $cookieStore.put('authorization', false);
                $cookieStore.put('admin', false);
            };


            $scope.language = function() {
                if ($rootScope.langs == 'eng' || !$rootScope.langs) {
                    $rootScope.langs = 'ua';
                }
                else {
                    $rootScope.langs = 'eng';
                }
            };

            if ($rootScope.langs == 'eng' || !$rootScope.langs) {
                $rootScope.lang = false;
                $rootScope.langs = 'eng'
            }
            else {
                $rootScope.lang = true;
            }

            console.log($rootScope.langs);

        }
    }
});


artApp.directive('uploadFile', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/upload-file.html',
        controller: 'uploadFileCtrl'
    }
});


artApp.directive('jurySelectProject', function() {
    return {
        restrict: 'E',
        templateUrl: 'template/jury-select-project.html',
        controller: 'homeCtrl'
    }
});


artApp.directive('fotoramaImg', function () {
    return {
        link: function(scope, element, attrs) {
            if (scope.$last) {
                setTimeout(function(){
                    $('.fotorama')
                        .on('fotorama:ready', function (e, fotorama) {
                            fotorama.show();
                        })
                        .fotorama({
                            width: '100%',
                            height: 400,
                            loop: true,
                            keyboard: true,
                            nav: 'thumbs',
                            allowfullscreen: true
                        });
                });
            }
        }
    }
});


artApp.directive('alert', function () {
    return {
        restrict: 'E',
        templateUrl: 'template/alert.html',
        controller: 'alertCtrl'
    }
});
'use strict';

/* Filters */

'use strict';

/* Services */

