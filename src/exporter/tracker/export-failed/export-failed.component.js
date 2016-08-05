(function () {
    'use strict';
    angular.module('app.exporter')
        .component('exportFailed', {
            templateUrl: 'src/exporter/tracker/export-failed/export-failed.html',
            controller: ExportFailedComponent,
            controllerAs: 'exportFailed'
        });
    ExportFailedComponent.$inject = ['EventEmitterService', 'ExporterEvents'];
    function ExportFailedComponent(EventEmitterService, ExporterEvents) {
        var exportFailed = this;
        exportFailed.$onInit = onInit;
        exportFailed.shown = true;
        exportFailed.getIcon = getIcon;
        EventEmitterService.onComplete(ExporterEvents.GET_FAILED_EVENT, function (exports) {
            exportFailed.isLoading = false;
            exportFailed.exports = exports;
        });
        exportFailed.removeExport = removeExport;
        function onInit() {
            exportFailed.isLoading = true;
            EventEmitterService.emit(ExporterEvents.GET_FAILED_EVENT);
        }

        function getIcon() {
            return 'img/ext/svg/blank-file.svg';
        }

        function removeExport(exportTracker) {
            exportTracker.isRemoving = true;
            EventEmitterService.emit(ExporterEvents.REMOVE_EXPORT_ITEM, exportTracker, function () {
                EventEmitterService.emit(ExporterEvents.GET_FAILED_EVENT);
            });
        }
    }
})();