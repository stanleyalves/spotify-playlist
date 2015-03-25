var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    concat  = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    gutil = require('gulp-util'),
    livereload = require('gulp-livereload'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    size = require ('gulp-size');

var onerror = function(err) {
    if (err) gutil.log(gutil.colors.magenta('!! Error'), ':', gutil.colors.cyan(err.plugin), '-', gutil.colors.red(err.message));
};

//Server Setup
function startExpress() { 
    var express = require('express');
    var app = express();
    app.use(require('connect-livereload')());
    app.use(express.static(__dirname + '/dist'));
    module.exports = app;
    app.listen(4000);
    console.log('http://localhost:4000 running');
}

gulp.task('scripts', function() {
    return gulp.src(['./src/js/vendors/angular.min.js','./src/app.js','./src/**/*.js'])
        .pipe(plumber({
            errorHandler: onerror
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(rename('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(livereload());
});

gulp.task('styles', function() {
    return gulp.src(['./src/**/*.scss'])
        .pipe(plumber({
            errorHandler: onerror
        }))
        .pipe(sass({
            sourceComments: 'map'
        }))
        .pipe(prefix({
            browsers: ['> 1%', 'last 3 versions', 'ie 8']
        }))
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(size())
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(size())
        .pipe(gulp.dest('./dist/assets/css'))
        .pipe(livereload());
})

gulp.task('html', function() {
    return gulp.src(['./src/**/*.html'])
        .pipe(plumber({
            errorHandler: onerror
        }))
        .pipe(gulp.dest('./dist'))
        .pipe(livereload());
});

//Copy over assets folder
gulp.task('build', function(){
    console.log('building...')
    gulp.src(['src/assets/**/**/*'])
        .pipe(gulp.dest('dist/assets'));
    console.log('...finished building')
});

gulp.task('watch', ['styles', 'scripts', 'html'], function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['html']);
    startExpress();
});

gulp.task('default', ['watch', 'build']);

//Delete the dist.
gulp.task('clean', function() {
    del(['dist']);
});