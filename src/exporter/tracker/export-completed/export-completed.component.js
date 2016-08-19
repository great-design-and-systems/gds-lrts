(function() {
    'use strict';
    angular.module('app.exporter')
        .component('exportCompleted', {
            templateUrl: 'src/exporter/tracker/export-completed/export-completed.html',
            controller: ExportCompletedComponent,
            controllerAs: 'exportCompleted'
        });
    ExportCompletedComponent.$inject = ['EventEmitterService', 'ExporterEvents', '$mdDialog', 'DownloaderService'];

    function ExportCompletedComponent(EventEmitterService, ExporterEvents, $mdDialog, DownloaderService) {
        var exportCompleted = this;
        exportCompleted.$onInit = onInit;
        exportCompleted.shown = true;
        exportCompleted.getIcon = getIcon;
        EventEmitterService.onComplete(ExporterEvents.GET_COMPLETED_EVENT, function(exports) {
            exportCompleted.isLoading = false;
            exportCompleted.exports = exports;
        });
        exportCompleted.getLink = getLink;

        function onInit() {
            exportCompleted.isLoading = true;
            EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
        }

        function getIcon(exportCompleted) {
            var icon = 'img/ext/svg/csv-file-format-symbol.svg';
            if (exportCompleted.type === 'pdf_exporter') {
                icon = 'img/ext/svg/pdf-file-format-symbol.svg';
            }
            return icon;
        }

        function getLink(fileId) {
            return DownloaderService.createDownloadLink(fileId);
        }
    }
})();