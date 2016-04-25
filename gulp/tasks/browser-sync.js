var gulp = require('gulp');
var config = require('../config');
var browserSync = require('browser-sync').create(config.server.name);

// Static sync server
gulp.task('browser-sync', function () {
    browserSync.init(config.server);
    gulp.watch(config.dir.srcLess + "/*.less", ['less']);
});