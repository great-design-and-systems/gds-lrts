'use strict';

var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');

var LIB_JS = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-resource/angular-resource.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/socket.io-client/socket.io.js',
    'vendors/pace/pace.js',
    'vendors/jqClock/jqClock.js',
    'bower_components/angular-material-data-table/dist/md-data-table.js'
];

var LIB_CSS = [
    'vendors/pace/pace.css',
    'bower_components/angular-material/angular-material.css',
    'vendors/jqClock/jqClock.css',
    'bower_components/angular-material-data-table/dist/md-data-table.css'
];

module.exports = function (gulp) {
    gulp.task('vendor-build', function () {
        runSequence('vendor-concat-scripts', 'vendor-concat-css', 'vendor-compress-scripts', 'vendor-compress-css');
    });

    gulp.task('vendor-debug', function () {
        runSequence('vendor-concat-scripts', 'vendor-concat-css');
    });

    gulp.task('vendor-compress-scripts', function (cb) {
        pump([
            gulp.src('dist/vendors.js'),
            uglify({
                mangle: false
            }),
            gulp.dest('dist/release')
        ], cb);
    });

    gulp.task('vendor-compress-css', function (cb) {
        return gulp.src('./dist/vendors.css')
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest('./dist/release'));
    });

    gulp.task('vendor-concat-scripts', function () {
        return gulp.src(LIB_JS)
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('vendor-concat-css', function () {
        return gulp.src(LIB_CSS)
            .pipe(concat('vendors.css'))
            .pipe(gulp.dest('./dist'));
    });
};