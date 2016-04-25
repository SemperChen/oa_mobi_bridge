/**
 * Created by ChihoSin.
 */
var gulp = require('gulp');
var rename = require('gulp-rename')
var config = require('../config');

// Script assets sync
gulp.task('assets-script', function () {

    gulp.src(['./node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/es6-shim/es6-shim.min.js',
            './node_modules/systemjs/dist/system-polyfills.js',
            './node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
            './node_modules/angular2/bundles/angular2-polyfills.js',
            './node_modules/systemjs/dist/system.src.js',
            './node_modules/rxjs/bundles/Rx.js',
            './node_modules/angular2/bundles/angular2.dev.js',
            './node_modules/angular2/bundles/router.dev.js',
            './node_modules/angular2/bundles/http.dev.js'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dir.srcScripts));

});

// Style assets sync
gulp.task('assets-style', function () {

    gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dir.srcStyles));

    gulp.src(['./node_modules/font-awesome/fonts/*'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(config.dir.srcFonts));
});