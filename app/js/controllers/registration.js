
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