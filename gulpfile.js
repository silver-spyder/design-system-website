'use strict';

///////////////////////////////
// MODULES                   //
///////////////////////////////
var assemble = require('fabricator-assemble');
var browserSync = require('browser-sync').create();
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var imagemin = require('gulp-imagemin');
var prefix = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var webpack = require('webpack');


///////////////////////////////
// CONFIGURATION             //
///////////////////////////////

// Set env with --env=$env flag
// like this: gulp serve --env=dev
// Source: http://ypereirareis.github.io/blog/2015/10/13/gulp-gulpfile-environment-variable/
var env = gutil.env.env || undefined;

var config = {
  src: {
    scripts: 'src/assets/scripts/*.js',
    styles: {
      main: 'src/assets/styles/main.scss',
    },
    views: 'src/views/*.html',
    bluemix: {
      compMarkdown: 'bower_components/bluemix-components/components/**/*.md',
      baseMarkdown: 'bower_components/bluemix-components/base-elements/**/*.md',
    },
    raw: {
      html: {
        components: 'bower_components/bluemix-components/components/**/*.html',
        baseElements: 'bower_components/bluemix-components/base-elements/**/*.html'
      },
      js: {
        baseJS: 'bower_components/bluemix-components/base-elements/**/*.js',
        compJS: 'bower_components/bluemix-components/components/**/*.js'
      }
    }
  },
  dest: 'dist'
};


///////////////////////////////
// COPY                      //
///////////////////////////////

gulp.task('copy:components-raw', function() {
  var components = config.src.raw.html.components;

  return gulp.src(components)
    .pipe(rename({
        dirname: '',
        suffix: '-raw'
      }))
    .pipe(gulp.dest('src/materials/raw--html'));
});

gulp.task('copy:baseElements-raw', function() {
  var baseElements = config.src.raw.html.baseElements;

  return gulp.src(baseElements)
    .pipe(rename({
        dirname: '',
        suffix: '-raw'
      }))
    .pipe(gulp.dest('src/materials/raw--html'));
});

gulp.task('copy:comp-js', function() {
  var compJS = config.src.raw.js.compJS;

  return gulp.src(compJS)
    .pipe(rename({
      dirname: '',
    }))
    .pipe(gulp.dest('src/materials/raw--js'));
});

gulp.task('copy:base-js', function() {
  var baseJS = config.src.raw.js.baseJS;

  return gulp.src(baseJS)
    .pipe(rename({
      dirname: '',
    }))
    .pipe(gulp.dest('src/materials/raw--js'));
});

gulp.task('copy:fonts', function() {
  var fonts = 'src/assets/fonts/*.{woff,woff2}';

  return gulp.src(fonts)
    .pipe(gulp.dest(config.dest + '/assets/styles'));
});

gulp.task('copy:base', function() {
  var comps = 'src/materials/docs--base-elements/*.html';

  return gulp.src(comps)
    .pipe(gulp.dest('src/views/base-elements'))
});

gulp.task('copy:comps', function() {
  var comps = 'src/materials/docs--components/*.html';

  return gulp.src(comps)
    .pipe(gulp.dest('src/views/components'))
});

gulp.task('copy', ['copy:components-raw', 'copy:baseElements-raw','copy:comp-js', 'copy:base-js', 'copy:fonts', 'copy:base', 'copy:comps']);


///////////////////////////////
// STYLES                    //
///////////////////////////////

gulp.task('styles', function () {
  return gulp.src(config.src.styles.main)
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(prefix({
      browsers: ['> 1%', 'last 2 versions']
    }))
    .pipe(gulpif(env !== 'dev', csso()))
    .pipe(rename('main.css'))
    .pipe(gulp.dest(config.dest + '/assets/styles'))
    .pipe(gulpif(env === 'dev', browserSync.stream()));
});


///////////////////////////////
// SCRIPTS                   //
///////////////////////////////

gulp.task('scripts', function (cb) {
  webpack({
    devtool: 'source-maps',
    entry: './src/assets/scripts/main.js',
    output: {
      path: config.dest + '/assets/scripts',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: [/node_modules/, /bower_components/],
          loaders: ['babel-loader']
        }
      ]
    }
  }, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      progress: true,
      colors: true
    }));
    cb();
  });
});

///////////////////////////////
// ASSEMBLE                  //
///////////////////////////////

gulp.task('assemble', ['copy'], function(done) {
  assemble({
    helpers: {
      markdown: require('helper-markdown'),
      decode: function (val) {
        return decodeURIComponent(val);
      },
      raw: function (options) {
        return options.fn();
      }
  }
  });
  done();
});


///////////////////////////////
// CLEAN                     //
///////////////////////////////

gulp.task('clean', function (cb) {
  del(['**'], { ignore: 'demo/**', cwd: config.dest }, cb);
});


///////////////////////////////
// BUILD                     //
///////////////////////////////

gulp.task('build', ['copy', 'styles', 'scripts', 'assemble']);

///////////////////////////////
// SERVE                     //
///////////////////////////////

gulp.task('serve', function () {

  var reload = browserSync.reload;

  browserSync.init({
    proxy: 'localhost:8080',
    notify: true,
    open: false,
    logPrefix: 'Bluemix Design System'
  });

  gulp.watch('src/**/*.{html,md,json,yml}', ['assemble']).on('change', reload);
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/assets/scripts/**/*.js', ['scripts']).on('change', reload);
  gulp.watch(config.src.images, ['images']).on('change', reload);
});