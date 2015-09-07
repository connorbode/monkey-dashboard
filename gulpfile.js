var gulp       = require('gulp');
var reactify   = require('reactify');
var browserify = require('browserify');
var watchify   = require('watchify');
var minifyify  = require('minifyify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var gutil      = require('gulp-util');
var sass       = require('gulp-sass');
var concat     = require('gulp-concat');
var minifyCss  = require('gulp-minify-css');

gulp.task('watchify', function () {
  var bundler = browserify({
    debug:        true,
    transform:    [ reactify, babelify ],
    entries:      [ './app/index.js' ],
    cache:        {},
    packageCache: {}
  });
  bundler.plugin('minifyify', { map: 'app.js.map', output: __dirname + '/dist/app.js.map' });
  var watcher = watchify(bundler);

  return watcher
    .on('error', function (err) {
      gutil.log(err.message);
    })
    .on('update', function () {
      gutil.log('Starting app bundle compilation');
      watcher.bundle()
        .pipe(source('./index.js'))
        .pipe(gulp.dest('./dist/'));
      gutil.log('Finished app bundle compilation');
    })
    .bundle()
    .pipe(source('./index.js'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('sass', function () {
  return gulp.src('app/**/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/'));
});
