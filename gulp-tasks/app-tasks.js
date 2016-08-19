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
    /* GdsApp */
    'src/app/app.module.js',
    'src/app/app.constant.js',
    'src/app/app.route.js',
    'src/app/app.vendor.js',
    'src/app/app.controller.js',
    'src/app/app.config.js',
    'src/app/app.theme.js',
    'src/app/events/open-dialog.event.js',
    'src/app/events/open-confirm-dialog.event.js',
    'src/app/common/event-emitter/event-emitter.service.js',
    /* Core */
    'src/app/core/core.module.js',
    'src/app/core/clock/clock.directive.js',
    'src/app/core/page-control/page-control.component.js',
    'src/app/core/toolbar-logo/toolbar-logo.component.js',
    'src/app/core/main-frame/main-frame.component.js',
    'src/app/core/info-bar/info-bar.component.js',
    'src/app/core/auto-height/auto-height.directive.js',
    'src/app/core/navigation-links/navigation-links.component.js',
    'src/app/core/frame-legend/frame-legend.component.js',
    'src/app/core/emit-event/emit-event.directive.js',
    'src/app/core/page-settings/page-settings.component.js',
    /* Monitor */
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
    /* Scanner */
    'src/scanner/scanner.module.js',
    'src/scanner/scanner.service.js',
    /* Exporter */
    'src/exporter/exporter.module.js',
    'src/exporter/exporter.service.js',
    'src/exporter/exporter.constant.js',
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
    /* Downloader */
    'src/downloader/downloader.module.js',
    'src/downloader/downloader.service.js',
    'src/downloader/downloader.constant.js',
    /* School */
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
    'src/school/setting/department-setting/department-resource.service.js',
    'src/school/setting/department-setting/department-setting.component.js',
    'src/school/events/create-department.event.js',
    'src/school/events/delete-department.event.js',
    'src/school/events/get-departments.event.js',
    'src/school/events/update-department.event.js',
    'src/school/events/open-edit-department-dialog.event.js',
    'src/school/events/open-remove-department-confirm-dialog.event.js',
    'src/school/setting/department-setting/edit-department/edit-department.controller.js',
    'src/school/setting/education-level-setting/education-level-resource.service.js',
    'src/school/setting/education-level-setting/education-level-setting.component.js',
    'src/school/events/create-education-level.event.js',
    'src/school/events/delete-education-level.event.js',
    'src/school/events/get-education-levels.event.js',
    'src/school/events/update-education-level.event.js',
    'src/school/events/open-edit-education-level-dialog.event.js',
    'src/school/events/open-remove-education-level-confirm-dialog.event.js',
    'src/school/setting/education-level-setting/edit-education-level/edit-education-level.controller.js',
    'src/school/setting/school-year-setting/school-year-resource.service.js',
    'src/school/setting/school-year-setting/school-year-setting.component.js',
    'src/school/events/create-school-year.event.js',
    'src/school/events/delete-school-year.event.js',
    'src/school/events/get-school-years.event.js',
    'src/school/events/update-school-year.event.js',
    'src/school/events/open-edit-school-year-dialog.event.js',
    'src/school/events/open-remove-school-year-confirm-dialog.event.js',
    'src/school/setting/school-year-setting/edit-school-year/edit-school-year.controller.js',
    'src/school/events/open-add-school-year-dialog.event.js',
    'src/school/setting/school-year-setting/add-school-year/add-school-year.controller.js',
    'src/school/setting/semester-setting/semester-resource.service.js',
    'src/school/setting/semester-setting/semester-setting.component.js',
    'src/school/events/create-semester.event.js',
    'src/school/events/delete-semester.event.js',
    'src/school/events/get-semesters.event.js',
    'src/school/events/update-semester.event.js',
    'src/school/events/open-edit-semester-dialog.event.js',
    'src/school/events/open-remove-semester-confirm-dialog.event.js',
    'src/school/setting/semester-setting/edit-semester/edit-semester.controller.js',
    'src/school/events/open-add-semester-dialog.event.js',
    'src/school/setting/semester-setting/add-semester/add-semester.controller.js',
    'src/school/events/open-id-lock-dialog.event.js',
    'src/school/id-lock-dialog/school-id-lock-dialog.controller.js',
    /* Code */
    'src/code/code.module.js',
    'src/code/code.constant.js',
    'src/code/code-resource.service.js',
    'src/code/events/delete-code-by-id.event.js',
    /* Login */
    'src/login/login.module.js',
    'src/login/login.constant.js',
    'src/login/login-resource.service.js',
    'src/login/login.component.js',
    'src/login/events/login.event.js',
    /* Session */
    'src/session/session.module.js',
    'src/session/session.constant.js',
    'src/session/session.service.js',
    'src/session/is-session-active/is-session-active.js',
    'src/session/events/check-session.event.js',
    /* User */
    'src/user/user.module.js',
    'src/user/user-resource.service.js',
    'src/user/user.constant.js',
    'src/user/user.service.js',
    'src/user/events/get-user-name.event.js',
    'src/user/events/get-user-profile.event.js',
    'src/user/link/user-link.component.js',
    'src/user/change-password/change-password.component.js',
    'src/user/events/change-password.event.js',
    'src/user/events/get-user-pasword.event.js',
    'src/user/events/change-password.event.js',
    'src/user/create-user/create-user.component.js',
    'src/user/events/register.event.js',
    /* Logout */
    'src/logout/logout.module.js',
    'src/logout/logout.constant.js',
    'src/logout/logout.service.js',
    'src/logout/events/logout.event.js',
    /* Upload */
    'src/upload/upload.module.js',
    'src/upload/upload-resource.service.js',
    'src/upload/events/upload-single-file.event.js',
    'src/upload/upload.constant.js',
    /* Security */
    'src/security/security.module.js',
    'src/security/security-resource.service.js',
    'src/security/security.constant.js',
    'src/security/events/validate-password.event.js',
    /* Reports */
    'src/reports/reports.module.js',
    'src/reports/links/reports-link.component.js',
    'src/reports/content/reports-content.component.js',
    'src/reports/settings/reports-settings.component.js',
    'src/reports/reports.service.js',
    'src/reports/control/reports-control.component.js',
    'src/reports/content/table/reports-table.component.js',
    'src/reports/events/generate-reports.event.js',
    'src/reports/reports.contant.js',
    'src/reports/reports-resource.service.js',
    'src/reports/content/bar-chart/reports-bar-chart.component.js',
    'src/reports/content/line-chart/reports-line-chart.component.js',
    /* Students */
    'src/students/students.module.js',
    'src/students/links/students-link.component.js',
    'src/students/control/students-control.component.js',
    'src/students/students.component.js',
    'src/students/students-resource.service.js',
    'src/students/students.constant.js',
    'src/students/events/get-profile-by-student-id.event.js',
    'src/students/events/create-student.event.js',
    'src/students/events/update-student.event.js',
    'src/students/events/delete-student.event.js',
    'src/students/events/get-students.event.js',
    /* Faculty */
    'src/faculty/faculty.module.js',
    'src/faculty/links/faculty-link.component.js',
    'src/faculty/faculty.constant.js',
    'src/faculty/faculty-resource.service.js',
    'src/faculty/events/create-faculty.event.js',
    'src/faculty/events/delete-faculty.event.js',
    'src/faculty/events/get-faculties.event.js',
    'src/faculty/events/get-profile-by-faculty-id.event.js',
    'src/faculty/events/update-faculty.event.js',
    /* Label */
    'src/labels/labels.module.js',
    'src/labels/labels.constant.js',
    'src/labels/labels-resource.service.js',
    'src/labels/labels.service.js',
    'src/labels/events/get-label.event.js',
    'src/labels/events/cascade-labels.event.js',
    /* Importer */
    'src/importer/importer.module.js',
    'src/importer/importer.constant.js',
    'src/importer/importer-resource.service.js',
    'src/importer/importer.services.js',
    'src/importer/setting-dialog/import-setting-dialog.controller.js',
    'src/importer/events/get-import-completed.event.js',
    'src/importer/events/get-import-failed.event.js',
    'src/importer/events/get-import-progress.js',
    'src/importer/events/get-import-logs.event.js',
    'src/importer/events/create-import-csv.event.js',
    'src/importer/events/run-import-csv.event.js',
    'src/importer/events/remove-import-tracker.event.js',
    'src/importer/events/open-import-setting-dialog.event.js',
    'src/importer/events/opem-remove-import-confirm-dialog.event.js',
    'src/importer/tracker/import-completed/import-completed.component.js',
    'src/importer/tracker/import-in-progress/import-in-progress.component.js',
    'src/importer/tracker/import-failed/import-failed.component.js',
    'src/importer/logs/import-logs.component.js',
    /* Print */
    'vendors/ngPrint/ngPrint.js'
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