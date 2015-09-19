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
var del        = require('del');
var rename     = require('gulp-rename');

gulp.task('watchify', function () {
  var bundler = browserify({
    debug:        true,
    transform:    [ reactify, babelify ],
    entries:      [ './app/index.js' ],
    cache:        {},
    packageCache: {}
  });
  bundler.plugin('minifyify', { map: 'app.js.map', output: __dirname + '/dist/static/app.js.map' });
  var watcher = watchify(bundler);

  return watcher
    .on('update', function () {
      gutil.log('Starting app bundle compilation');
      watcher.bundle()
        .on('error', function (err) {
          gutil.log(err);
        })
        .pipe(source('./index.js'))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('./dist/static/'));
      gutil.log('Finished app bundle compilation');
    })
    .bundle()
    .pipe(source('./index.js'))
    .pipe(rename('app.js'))
    .pipe(gulp.dest('./dist/static/'));
});

gulp.task('sass', function () {
  return gulp.src('app/**/*.scss')
    .pipe(concat('main.css'))
    .pipe(sass({ style: 'compressed' }).on('error', sass.logError))
    .pipe(minifyCss())
    .pipe(gulp.dest('./dist/static'));
});

gulp.task('watch-sass', function () {
  return gulp.watch('app/**/*.scss', ['sass']);
});

gulp.task('clean', function (done) {
  del.sync('./dist/');
  done();
});

gulp.task('html', function () {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch-html', function () {
  return gulp.watch('app/index.html', ['html']);
});

gulp.task('default', ['clean', 'sass', 'watch-sass', 'html', 'watch-html', 'watchify']);
