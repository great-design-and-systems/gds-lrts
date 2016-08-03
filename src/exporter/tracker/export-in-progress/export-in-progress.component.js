(function () {
    'use strict';
    angular.module('app.exporter')
        .component('exportInProgress', {
            templateUrl: 'src/exporter/tracker/export-in-progress/export-in-progress.html',
            controller: ExportInProgressComponent,
            controllerAs: 'exportInProgress'
        });
    ExportInProgressComponent.$inject = ['EventEmitterService', 'ExporterEvents'];
    function ExportInProgressComponent(EventEmitterService, ExporterEvents) {
        var exportInProgress = this;
        exportInProgress.$onInit = onInit;
        exportInProgress.shown = true;
        exportInProgress.getPercent = getPercent;
        EventEmitterService.onComplete(ExporterEvents.GET_IN_PROGRESS_EVENT, function (exports) {
            exportInProgress.exports = exports;
        });
        function onInit() {
            exportInProgress.isLoading = true;
            EventEmitterService.emit(ExporterEvents.GET_IN_PROGRESS_EVENT, function () {
                exportInProgress.isLoading = false;
            });
        }
        function getPercent(exportTracker) {
            return exportTracker.progressCount / exportTracker.progressLimit * 100;
        }
    }
})();