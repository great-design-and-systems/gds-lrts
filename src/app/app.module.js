(function () {
    'use strict';
    angular.module('gdsApp', [ /*Vendor modules */
        'ui.router',
        'ngResource',
        'ngMaterial',
        'md.data.table',
        'ngCookies',
        'mdColorPicker',
        /*start of application modules here*/
        'app.core',
        'app.monitor',
        'app.scanner',
        'app.exporter',
        'app.downloader',
        'app.school',
        'app.code',
        'app.login',
        'app.session',
        'app.user',
        'app.logout',
        'app.security',
        'app.reports',
        'app.students',
        'app.faculty',
        'app.labels'
    ]);
})();