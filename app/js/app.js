'use strict';

/* App Module */
var artApp = angular.module('artApp',
    [
        'ngRoute',
        'ngFileUpload',
        'ngCookies',
        'bootstrapLightbox',
        'ngAnimate',
        'chieffancypants.loadingBar',
        'ap.fotorama'
    ]);

//artApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//    cfpLoadingBarProvider.latencyThreshold = 500;
//}]);
angular.module('ui.fancybox', [])
    .value('uiFancyboxConfig', {
        helpers: {
            title: {
                type: 'inside'
            }
        },
        openEffect	: 'none',
        closeEffect	: 'none',
        fancyboxGroup: 'group'
    })
    .directive('uiFancybox', ['uiFancyboxConfig', function (uiFancyboxConfig) {

        return {
            link: function(scope, element, attrs) {

                var opts = {};

                angular.extend(opts, uiFancyboxConfig);

                if (opts.fancyboxGroup) element.attr('data-fancybox-group', opts.fancyboxGroup);

                //scope.$watch(attrs.oiFile, function (newVal, oldVal) {
                //    opts = angular.extend({}, uiFancyboxConfig, newVal);
                //}, true);

                //Ïðèâÿçûâàåì ëàéòáîêñ ê ýëåìåíòó
                element.fancybox(opts);

            }
        };
    }]);



artApp.config(function(cfpLoadingBarProvider) {
    // true is the default, but I left this here as an example:
    cfpLoadingBarProvider.includeSpinner = true;
});

artApp.config(function (LightboxProvider) {
    // set a custom template
    LightboxProvider.templateUrl = 'template/modal.html';

    // our images array is not in the default format, so we have to write this
    // custom method
    LightboxProvider.getImageUrl = function (imageUrl) {
        return 'images/img/' + imageUrl.src;
    };

    // set the caption of each image as its text color
    //LightboxProvider.getImageCaption = function (imageUrl) {
    //    return '#' + imageUrl.src.match(/00\/(\w+)/)[1];
    //};

    // increase the maximum display height of the image
    LightboxProvider.calculateImageDimensionLimits = function (dimensions) {
        return {
            'maxWidth': dimensions.windowWidth >= 768 ? // default
            dimensions.windowWidth - 92 :
            dimensions.windowWidth - 52,
            'maxHeight': 1600                           // custom
        };
    };

    // the modal height calculation has to be changed since our custom template is
    // taller than the default template
    LightboxProvider.calculateModalDimensions = function (dimensions) {
        var width = Math.max(400, dimensions.imageDisplayWidth + 32);

        if (width >= dimensions.windowWidth - 20 || dimensions.windowWidth < 768) {
            width = 'auto';
        }

        return {
            'width': width,                             // default
            'height': 'auto'                            // custom
        };
    };
});


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
