var gulp = require('gulp');
var config = require('../config');
var less = require('gulp-less');
var browserSync = require('browser-sync').get(config.server.name);

// Compile Less into CSS
gulp.task('less', function () {
    return gulp.src(config.dir.srcLess + "/main.less")
        .pipe(less())
        .pipe(gulp.dest(config.dir.srcStyles))
        .pipe(browserSync.stream());
});