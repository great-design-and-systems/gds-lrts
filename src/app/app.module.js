(function () {
    'use strict';
    Bootstrap.$inject = ['EventEmitterService', 'LabelsEvents', 'LabelsService'];
    function Bootstrap(EventEmitterService, LabelsEvents, LabelsService) {
        EventEmitterService.emit(LabelsEvents.GET_LABELS, function (err, result) {
            if(!err){
                LabelsService.setLabels(result);
            }
        });
    }

    angular.module('gdsApp', [/*Vendor modules */
        'ui.router',
        'ngResource',
        'ngMaterial',
        'md.data.table',
        'ngCookies',
        'mdColorPicker',
        'ngPrint',
        'ngFileUpload',
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
        'app.labels',
        'app.upload',
        'app.importer',
        'app.file'
    ]).run(Bootstrap);
})();