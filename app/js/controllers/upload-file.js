


artApp.controller('uploadFileCtrl', ['$scope', 'Upload', function ($scope, Upload) {

    if (!$scope.photo) {
        $scope.photo = [];
    }

    $scope.$watch('files', function () {
        $scope.upload($scope.files);
    });

    $scope.log = '';


    $scope.deleteImg = function(index) {
        $scope.photo.splice(index, 1);
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
