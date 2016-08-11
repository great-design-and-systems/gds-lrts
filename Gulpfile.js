'use strict';

var API_HOST = process.env.API_HOST || 'https://gds-ms-api.herokuapp.com';
var SCANNER_CONTEXT = process.env.SCANNER_CONTEXT || '/gds/scanner/';
var TIME_CONTEXT = process.env.TIME_CONTEXT || '/gds/timeServicePort/';
var SCHOOL_ID = process.env.SCHOOL_ID || '57a60c8d9b19871d0010f0dd'; //Assumption college
var SCHOOL_CONTEXT = process.env.SCHOOL_CONTEXT || '/gds/schoolConfigServicePort/';
var EXPORT_CONTEXT = process.env.EXPORT_CONTEXT || '/gds/export/';
var FILE_CONTEXT = process.env.EXPORT_CONTEXT || '/gds/fileServicePort/';
var LOGIN_CONTEXT = process.env.LOGIN_CONTEXT || '/gds/login/';
var USER_CONTEXT = process.env.USER_CONTEXT || '/gds/userServicePort/';
var gulp = require('gulp');
var runSequence = require('run-sequence');
var htmlreplace = require('gulp-html-replace');
var replace = require('gulp-replace');
var appTasks = new require('./gulp-tasks/app-tasks')(gulp);
new require('./gulp-tasks/vendor-tasks')(gulp);

gulp.task('default', function() {
    runSequence('vendor-build', 'set-constant-values', 'app-build', 'html-prod');
});
gulp.task('debug', function() {
    runSequence('vendor-debug', 'set-constant-values', 'app-debug', 'html-dev');
})
gulp.task('html-dev', function() {
    return gulp.src('html-build/index.html')
        .pipe(htmlreplace({
            appJS: appTasks.SRC_JS,
            appCSS: 'dist/app.css',
            vendorJS: 'dist/vendors.js',
            vendorCSS: 'dist/vendors.css'
        }))
        .pipe(gulp.dest('.'));
})

gulp.task('html-prod', function() {
    return gulp.src('html-build/index.html')
        .pipe(htmlreplace({
            appJS: 'dist/release/app.js',
            appCSS: 'dist/release/app.css',
            vendorJS: 'dist/release/vendors.js',
            vendorCSS: 'dist/release/vendors.css'
        }))
        .pipe(gulp.dest('.'));
});

gulp.task('set-constant-values', function() {
    gulp.src(['html-build/app.constant.js'])
        .pipe(replace('#API_HOST', API_HOST))
        .pipe(replace('#SCANNER_CONTEXT', SCANNER_CONTEXT))
        .pipe(replace('#TIME_CONTEXT', TIME_CONTEXT))
        .pipe(replace('#SCHOOL_CONTEXT', SCHOOL_CONTEXT))
        .pipe(replace('#EXPORT_CONTEXT', EXPORT_CONTEXT))
        .pipe(replace('#FILE_CONTEXT', FILE_CONTEXT))
        .pipe(replace('#SCHOOL_ID', SCHOOL_ID))
        .pipe(replace('#LOGIN_CONTEXT', LOGIN_CONTEXT))
        .pipe(replace('#USER_CONTEXT', USER_CONTEXT))
        .pipe(gulp.dest('src/app/'));
});