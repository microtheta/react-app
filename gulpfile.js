// Update: Hey Folks - I've got a full Gulpfile with everything else over at https://github.com/wesbos/React-For-Beginners-Starter-Files
/*
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var babelify = require('babelify');
var watchify = require('watchify');
var notify = require('gulp-notify');
var uglify = require('gulp-uglify');

var server = require('gulp-express');


function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end'); // Keep gulp from hanging on this task
}

function buildScript(file, watch) {
  
  var props = {
    entries: ['./app/' + file],
    debug : true,
    transform:  [babelify.configure({ presets: ["es2015", "react"] })]
  };

  // watchify() if watch requested, otherwise run browserify() once 
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(streamify(uglify()))
      .pipe(gulp.dest('./public/'))
      .pipe(server.notify());
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    console.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}


// run once
gulp.task('scripts', function() {
  return buildScript('main.js', false);
});


// run 'scripts' task first, then watch for future changes
gulp.task('default', ['scripts'], function() {
    server.run(['app.js']);
    return buildScript('main.js', true);
});


*/

var babelify    = require('babelify');
var browserify  = require('browserify');
var bs          = require('browser-sync').create();
var del         = require('del');
var gulp        = require('gulp');
var gutil       = require('gulp-util');
var source      = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var watchify    = require('watchify');
var uglify = require('gulp-uglify');
var nodemon = require('gulp-nodemon');

gulp.task('browser-sync', function () {
 bs.init({
   open: false,
   server: {
     baseDir: './dist'
   }
 });
});

gulp.task('clean', function () {
  del([
    'dist/**/*',
  ]);
});

var scripts = {
 b: browserify('./app/main.js', {
   debug: false
 })
 .transform(babelify),
 build: function () {
   gutil.log('🕒 ', gutil.colors.yellow('Building Scripts...'));
   return scripts.b
     .bundle()
     .on('error', gutil.log.bind(gutil, '❌ ', gutil.colors.red('Error:')))
     .pipe(source('main.js'))
     .pipe(streamify(uglify()))
     .pipe(gulp.dest("./public"));
 },
 reload: function () {
   return scripts.build()
     .pipe(bs.stream());
 },
 watch: function () {
   watchify(scripts.b)
     .on('update', scripts.reload)
     .on('time', function (time) {
       gutil.log('✅ ', gutil.colors.green('Built Scripts in'), gutil.colors.cyan(time + 'ms'));
     });
   return scripts.reload();
 }
};


gulp.task('nodemon', function (cb) {
  return nodemon({
    script: 'index.js',
    ignore: ['public/']
  });
});

gulp.task('build-scripts', ['clean'], scripts.build);
gulp.task('watch-scripts',  scripts.watch); //['browser-sync']
gulp.task('reload-scripts', scripts.reload);

gulp.task('default', ['nodemon','watch-scripts']);
