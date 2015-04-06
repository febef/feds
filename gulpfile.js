var gulp    = require('gulp');
var express = require('express');
var path    = require('path');
//var connect = require("connect");

var app = express();
gulp.task('express', function() {
  app.use(require('connect-livereload')({port: 9002}));
  app.use(express.static(path.join(__dirname, './')));
  app.listen(8080);
});

var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(9002);
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);
  console.log("Reload » " + fileName);
  for(var i =0; i< 100000;i++);
  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

gulp.task('watch', function() {
  gulp.watch('./*.html', notifyLiveReload);
  gulp.watch('./*.*', notifyLiveReload);
  gulp.watch('./**/*.js', notifyLiveReload);
  gulp.watch('./**/*.css', notifyLiveReload);
});

gulp.task('default', ['livereload', 'express', 'watch']);

