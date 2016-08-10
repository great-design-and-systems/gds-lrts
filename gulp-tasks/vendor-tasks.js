'use strict';

var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var copy = require('gulp-copy');

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
    'bower_components/angular-material-data-table/dist/md-data-table.js',
    'bower_components/moment/moment.js',
    'bower_components/lodash/lodash.js',
    'bower_components/angular-cookies/angular-cookies.js'
];

var LIB_CSS = [
    'bower_components/angular-material/angular-material.css',
    'bower_components/font-awesome/css/font-awesome.css',
    'bower_components/angular-material-data-table/dist/md-data-table.css',
    'vendors/pace/pace.css',
    'vendors/jqClock/jqClock.css',
];

var LIB_FONTS = ['bower_components/font-awesome/fonts/'];

module.exports = function(gulp) {
    gulp.task('vendor-build', function() {
        runSequence('vendor-concat-scripts', 'vendor-concat-css', 'vendor-compress-scripts', 'vendor-compress-css', 'vendor-copy-fonts-prod');
    });

    gulp.task('vendor-debug', function() {
        runSequence('vendor-concat-scripts', 'vendor-concat-css', 'vendor-copy-fonts');
    });

    gulp.task('vendor-compress-scripts', function(cb) {
        pump([
            gulp.src('dist/vendors.js'),
            uglify({
                mangle: false
            }),
            gulp.dest('dist/release')
        ], cb);
    });

    gulp.task('vendor-compress-css', function(cb) {
        return gulp.src('./dist/vendors.css')
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest('./dist/release'));
    });

    gulp.task('vendor-concat-scripts', function() {
        return gulp.src(LIB_JS)
            .pipe(concat('vendors.js'))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('vendor-concat-css', function() {
        return gulp.src(LIB_CSS)
            .pipe(concat('vendors.css'))
            .pipe(gulp.dest('./dist'));
    });

    gulp.task('vendor-copy-fonts', function() {
        gulp.src('./bower_components/font-awesome/fonts/*.*')
            .pipe(gulp.dest('./fonts/'));
    });
    gulp.task('vendor-copy-fonts-prod', function() {
        gulp.src('./bower_components/font-awesome/fonts/*.*')
            .pipe(gulp.dest('./dist/fonts/'));
    });
    gulp.task('vendor-concat-css', function() {
        return gulp.src(LIB_CSS)
            .pipe(concat('vendors.css'))
            .pipe(gulp.dest('./dist'));
    });
};