#!/usr/bin/env node
// feds is a simple front-end developer server.
// author : febef <fexbef@gmail.com>

var
   gulp    = require('gulp'),
   express = require('express'),
   path    = require('path'),
   colors  = require('colors'),
   app     = express(),
   cwd     = process.cwd(),
   tinylr;


var say = function(text, color) {
   console.log("+[".gray + "feds".blue + "]".gray +
               "  " + (text)[color || 'gray'] );
};

say("Configurin gulp...");

gulp.task('express', function() {
   app.use(require('connect-livereload')({port: 9002}));
   app.use(express.static(cwd));
   app.listen(8080, function(err) {
      say("Server is runing: http://localhost:8080", 'cyan');
   });
});

gulp.task('livereload', function() {
   tinylr = require('tiny-lr')();
   tinylr.listen(9002, function(){
      say("LiveReload ready.");
   });
});

function notifyLiveReload(event) {
   var fileName = path.relative(cwd, event.path);
   say("Reload » " + fileName, 'blue');
   for(var i =0; i< 100000;i++);
   tinylr.changed({
      body: {
         files: [fileName]
      }
   });
   say("waiting for changes...", 'magenta');
}

gulp.task('watch', function() {
   gulp.watch(cwd + '/*.html', notifyLiveReload);
   gulp.watch(cwd + '/*.*', notifyLiveReload);
   gulp.watch(cwd + '/**/*.js', notifyLiveReload);
   gulp.watch(cwd + '/**/*.css', notifyLiveReload);

   say("Watching files in: '" + cwd + "'.");
   say("waiting for changes...", 'magenta');
});

gulp.task('feds', ['livereload', 'express', 'watch']);

say("Starting feds");

gulp.start('feds');

