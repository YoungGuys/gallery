'use strict';

var   gulp         = require('gulp')
    , csso         = require('gulp-csso')
    , notify       = require("gulp-notify")
    , concat       = require('gulp-concat')
    , uglify       = require('gulp-uglify')
    , connect      = require('gulp-connect')
    , imagemin     = require('gulp-imagemin')
    , pngquant     = require('imagemin-pngquant')
    , autoprefixer = require('gulp-autoprefixer')

    , source     = require('vinyl-source-stream')
    , buffer     = require('vinyl-buffer')
    , gutil      = require('gulp-util')
    , assign     = require('lodash.assign')
    , watchify   = require('watchify')
    , browserify = require('browserify')
    , sourcemaps = require('gulp-sourcemaps')
    ;

/*
var customOpts = {
    entries: ['./app/js/'],
    noparse: ['app.all', 'app.min'],
    debug: true
};
var opts = assign({}, watchify.args, customOpts);
var b = watchify(browserify(opts));

gulp.task('js', bundle);
b.on('update', bundle);
b.on('log', gutil.log);

function bundle() {
    return b.bundle()
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist'));
}
*/


//server
gulp.task('server', function() {
    connect.server({
        root: 'app',
        livereload: true
    });
});


//html
gulp.task('html',function(){
    gulp.src(['./app/template/**/*.html' ,'index.html'])
        .pipe(connect.reload())
        .pipe(notify("Change html"));
});


//css
gulp.task('css',function(){
    gulp.src('./app/css/*.css')
        .pipe(connect.reload())
        .pipe(notify("Change css"));
});


//js
gulp.task('js', function() {
    gulp.src([
            './app/js/app.js',
            './app/js/route.js',
            './app/js/controllers/*.js',
            './app/js/directives.js',
            './app/js/filters.js',
            './app/js/services.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app.all.js'))
        .pipe(gulp.dest('./app/js/'))
        .pipe(sourcemaps.write())
        .pipe(connect.reload())
        .pipe(notify("Change js"));
});

gulp.task('js-lib', function() {
    gulp.src([
            './app/bower_components/angular/angular.js',
            './app/bower_components/angular-route/angular-route.js',
            './app/bower_components/angular-cookies/angular-cookies.min.js',
            './app/bower_components/angular-loading-bar/build/loading-bar.min.js',
            './app/bower_components/angular-animate/angular-animate.js',
            './app/js/bower_components/jquery/dist/jquery.js',
            './app/js/vendor/ng-file-upload-shim.js',
            './app/js/vendor/ng-file-upload.js',
            './app/js/vendor/fotorama.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('app-lib.js'))
        .pipe(gulp.dest('./app/js/'))
        .pipe(sourcemaps.write())
        .pipe(connect.reload())
        .pipe(notify("Change js-lib"));
});

gulp.task('css-all', function() {
    gulp.src([
            './app/css/bootstrap.css',
            './app/css/theme.css',
            './app/css/gradients.css',
            './app/css/fotorama.css',
            './app/bower_components/angular-loading-bar/build/loading-bar.min.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./app/css/'))
        .pipe(sourcemaps.write())
        .pipe(connect.reload())
        .pipe(notify("Change css"));
});

//clean-js
gulp.task('clean-js', function() {
    gulp.src('./app/js/app.all.js')
        .pipe(clean());
});


//watch
gulp.task('watch', function () {
    gulp.watch('./app/template/*', ['html']);
    gulp.watch('./app/css/**/*', ['css']);
    //gulp.watch('./app/js/**/*', ['clean-js']);
    gulp.watch('./app/js/**/*', ['js']);
});


//compress css
gulp.task('compress-css', function() {
    return gulp.src('./app/css/style.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./app/css/'));
});


//compress js
gulp.task('compress-js', function() {
    gulp.src(['./app/js/app.all.js', './app/js/app-lib.js'])
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/min/'))
});


//compress image
gulp.task('compress-image', function () {
    gulp.src('./app/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant({ quality: '50-70', speed: 4 })],
            interlaced: true
        }))
        .pipe(gulp.dest('./app/images/'))
        .pipe(notify("Compress img"));
});



//gulp.task('default', ['server', 'html', 'css', 'clean-js', 'js', 'watch']);
gulp.task('default', ['server', 'html', 'css', 'js', 'watch']);
gulp.task('production', ['js-lib', 'css-all', 'compress-js', 'compress-css', 'compress-image']);