'use strict';

var runSequence = require('run-sequence');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var pump = require('pump');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var jshint = require('gulp-jshint');
var angularTemplates = require('gulp-angular-templates');

var SRC_JS = [
    'src/app/app.module.js',
    'src/app/app.constant.js',
    'src/app/app.route.js',
    'src/app/app.vendor.js',
    'src/app/core/core.module.js',
    'src/app/core/clock/clock.directive.js',
    'src/app/core/page-control/page-control.component.js',
    'src/app/core/toolbar-logo/toolbar-logo.component.js',
    'src/app/core/main-frame/main-frame.component.js',
    'src/app/common/event-emitter/event-emitter.service.js',
    'src/app/core/info-bar/info-bar.component.js',
    'src/app/core/auto-height/auto-height.directive.js',
    'src/app/core/navigation-links/navigation-links.component.js',
    'src/app/core/frame-legend/frame-legend.component.js',
    'src/app/core/emit-event/emit-event.directive.js',
    'src/app/events/open-dialog.event.js',
    'src/app/events/open-confirm-dialog.event.js',
    'src/monitor/monitor.module.js',
    'src/monitor/monitor-resource.service.js',
    'src/monitor/monitor.component.js',
    'src/monitor/monitor.constant.js',
    'src/monitor/control/monitor-control.component.js',
    'src/monitor/events/refresh-event.service.js',
    'src/monitor/resource/get-today-resource.service.js',
    'src/monitor/link/monitor-link.component.js',
    'src/monitor/events/create-today-records-export-event.js',
    'src/monitor/export-layout/entry-export-layout.service.js',
    'src/school/school-resource.service.js',
    'src/scanner/scanner.module.js',
    'src/scanner/scanner.service.js',
    'src/app/app.theme.js',
    'src/exporter/exporter.module.js',
    'src/exporter/exporter.service.js',
    'src/exporter/exporter.contant.js',
    'src/exporter/tracker/export-in-progress/export-in-progress.component.js',
    'src/exporter/resource/exporter-resource.service.js',
    'src/exporter/events/get-export-in-progress.event.service.js',
    'src/exporter/events/create-export-csv.event.service.js',
    'src/exporter/events/add-export-items-csv-event.service.js',
    'src/exporter/events/get-export-completed.event.service.js',
    'src/exporter/tracker/export-completed/export-completed.component.js',
    'src/exporter/events/remove-export-item-event.service.js',
    'src/exporter/events/get-export-failed.event.service.js',
    'src/exporter/tracker/export-failed/export-failed.component.js',
    'src/exporter/csv/csv-formatter.service.js',
    'src/downloader/downloader.module.js',
    'src/downloader/downloader.service.js',
    'src/downloader/downloader.constant.js',
    'src/school/school.module.js',
    'src/school/school-resource.service.js',
    'src/school/setting/school-setting.component.js',
    'src/school/link/school-link.component.js',
    'src/school/setting/purpose-setting/purpose-setting.component.js',
    'src/school/school.constant.js',
    'src/school/setting/purpose-setting/purpose-setting-resource.service.js',
    'src/school/events/get-purposes-event.js',
    'src/school/events/open-add-purpose-dialog.event.js',
    'src/school/setting/purpose-setting/add-purpose/add-purpose.controller.js',
    'src/school/setting/purpose-setting/edit-purpose/edit-purpose.controller.js',
    'src/school/events/create-purpose-event.js',
    'src/school/events/edit-purpose-event.js',
    'src/school/events/open-edit-purpose-dialog.event.js',
    'src/school/events/open-remove-purpose-confirm-dialog.event.js',
    'src/code/code.module.js',
    'src/code/code.constant.js',
    'src/code/code-resource.service.js',
    'src/code/events/delete-code-by-id.event.js'
];

var SASS_INDEX = 'src/app.scss';

var SRC_SASS = 'src/**/*.scss';

module.exports = function (gulp) {
    gulp.task('jshint', function () {
        return gulp.src(SRC_JS)
            .pipe(jshint())
            .pipe(jshint.reporter('default', {
                verbose: true
            }));
    });
    gulp.task('sass', function () {
        return gulp.src(SASS_INDEX)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('./dist'));
    });
    gulp.task('sass:watch', function () {
        gulp.watch(SRC_SASS, ['sass']);
    });
    gulp.task('app-build', function () {
        runSequence('jshint', 'sass', 'app-template', 'app-concat-scripts', 'app-concat-templates', 'app-compress-scripts', 'app-compress-css');
    });
    gulp.task('app-debug', function () {
        runSequence('jshint', 'sass');
    });
    gulp.task('app-concat-scripts', function () {
        return gulp.src(SRC_JS)
            .pipe(concat('app.js'))
            .pipe(gulp.dest('./dist/'));
    });
    gulp.task('app-concat-templates', function () {
        return gulp.src(['dist/app.js', 'dist/templates/**/*.js'])
            .pipe(concat('app.js'))
            .pipe(gulp.dest('dist'));
    });
    gulp.task('app-compress-scripts', function (cb) {
        pump([
            gulp.src('dist/app.js'),
            uglify({
                mangle: false
            }),
            gulp.dest('dist/release')
        ], cb);
    });
    gulp.task('app-compress-css', function (cb) {
        return gulp.src('./dist/app.css')
            .pipe(uglifycss({
                "maxLineLen": 80,
                "uglyComments": true
            }))
            .pipe(gulp.dest('./dist/release'));
    });
    gulp.task('app-template', function () {
        return gulp.src('src/**/*.html')
            .pipe(angularTemplates({
                module: 'gdsApp',
                standalone: false
            }))
            .pipe(gulp.dest('dist/templates'));
    });
    return {
        SRC_JS: SRC_JS
    };
};
