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
    size = require ('gulp-size'),
    reactify = require('reactify');

var browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

var onerror = function(err) {
    if (err) gutil.log(gutil.colors.magenta('!! Error'), ':', gutil.colors.cyan(err.plugin), '-', gutil.colors.red(err.message));
};

//Server Setup
function startExpress() { 
  var express = require('express');
  var app = express();
  var bodyParser = require('body-parser');
  var fs = require('fs');
  app.use(require('connect-livereload')());
  app.use(express.static(__dirname + '/dist'));
  module.exports = app;
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.set('port', (process.env.PORT || 4000));
  app.listen(app.get('port'), function() {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
  });

  console.log('http://localhost:4000 running');


  //Set up the routes for out GET and POST for our app.
  app.get('/assets/data/comments.json', function(req, res) {
    fs.readFile('src/assets/data/comments.json', function(err, data) {
      res.setHeader('Content-Type', 'application/json');
      res.send(data);
    });
  });

  app.post('/assets/data/comments.json', function(req, res) {
    console.log(req);
    fs.readFile('src/assets/data/comments.json', function(err, data) {
      var comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('src/assets/data/comments.json', JSON.stringify(comments, null, 4), function(err) {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'no-cache');
        res.send(JSON.stringify(comments));
      });
    });
  });
}

gulp.task('scripts', function() {
    return browserify({
            entries: './src/js/app.js',
            transform: [reactify]
        })
        .bundle()
        .pipe(source('prod.js'))
        .pipe(plumber({
            errorHandler: onerror
        }))
        .pipe(gulp.dest('./dist/assets/js'))
        .pipe(buffer())
        .pipe(rename('prod.min.js'))
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

gulp.task('data', function(){
    console.log('data...')
    gulp.src(['src/assets/data/*.json'])
        .pipe(gulp.dest('dist/assets/data'));
    console.log('...finished data')
});

gulp.task('watch', ['styles', 'data', 'scripts', 'html'], function() {
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/assets/data/*.json', ['data']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['html']);
    startExpress();
});

gulp.task('default', ['watch', 'build']);

//Delete the dist.
gulp.task('clean', function() {
    del(['dist']);
});