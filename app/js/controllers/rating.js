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