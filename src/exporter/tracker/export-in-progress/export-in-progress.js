(function () {
    'use strict';
    angular.module('app.exporter')
        .component('exportInProgress', {
            templateUrl: 'src/exporter/tracker/export-in-progress/export-in-progress.html',
            controller: ExportInProgressComponent,
            controllerAs: 'exportInProgress'
        });
    function ExportInProgressComponent() {
        var exportInProgress = this;
        exportInProgress.$onInit = onInit;
        exportInProgress.shown = true;
        function onInit() {
        }
    }
})();