(function () {
    'use strict';
    angular.module('app.exporter')
        .component('exportInProgress', {
            templateUrl: 'src/exporter/tracker/export-in-progress/export-in-progress.html',
            controller: ExportInProgressComponent,
            controllerAs: 'exportInProgress'
        });
    ExportInProgressComponent.$inject = ['EventEmitterService', 'GET_IN_PROGRESS_EVENT'];
    function ExportInProgressComponent(EventEmitterService, GET_IN_PROGRESS_EVENT) {
        var exportInProgress = this;
        exportInProgress.$onInit = onInit;
        exportInProgress.shown = true;
        exportInProgress.exports = [{
            description: '8/3/16 Wednesday 12:20',
            progressCount: 10,
            progressLimit: 100,
            status: 'INPROGRESS'
        }, {
            description: '8/3/16 Wednesday 12:30',
            progressCount: 10,
            progressLimit: 100,
            status: 'INPROGRESS'
        }];
        exportInProgress.getPercent = getPercent;
        exportInProgress.isExporting = isExporting;
        EventEmitterService.onComplete('GET_IN_PROGRESS_EVENT', function (exports) {
            exportInProgress.exports = exports;
        });
        function onInit() {
            exportInProgress.isLoading = true;
            EventEmitterService.emit(GET_IN_PROGRESS_EVENT, function () {
                exportInProgress.isLoading = false;
            });
        }

        function getPercent(exportTracker) {
            return exportTracker.progressCount / exportTracker.progressLimit * 100;
        }
    }
})();