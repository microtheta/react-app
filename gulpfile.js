// Update: Hey Folks - I've got a full Gulpfile with everything else over at https://github.com/wesbos/React-For-Beginners-Starter-Files

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
