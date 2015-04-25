var   gulp         = require('gulp')
    , csso         = require('gulp-csso')
    , clean        = require('gulp-clean')
    , notify       = require("gulp-notify")
    , concat       = require('gulp-concat')
    , uglify       = require('gulp-uglify')
    , connect      = require('gulp-connect')
    , imagemin     = require('gulp-imagemin')
    , pngquant     = require('imagemin-pngquant')
    , autoprefixer = require('gulp-autoprefixer')
    ;


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
    gulp.src('./app/js/**/*.js')
        .pipe(concat('app.all.js'))
        .pipe(gulp.dest('./app/js/'))
        .pipe(connect.reload())
        .pipe(notify("Change js"));
});

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
    return gulp.src('./app/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(gulp.dest('./public/css/'));
});


//compress js
gulp.task('compress-js', function() {
    gulp.src('./app/js/app.all.js')
        .pipe(uglify())
        .pipe(gulp.dest('./app/js/app.min.js'))
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
gulp.task('default', ['server', 'html', 'css', 'watch']);
gulp.task('production', ['compress-js', 'compress-css', 'compress-image']);