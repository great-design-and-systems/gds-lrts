(function () {
    'use strict';
    angular.module('app.exporter')
        .component('exportCompleted', {
            templateUrl: 'src/exporter/tracker/export-completed/export-completed.html',
            controller: ExportCompletedComponent,
            controllerAs: 'exportCompleted'
        });
    ExportCompletedComponent.$inject = ['EventEmitterService', 'ExporterEvents', '$mdDialog'];
    function ExportCompletedComponent(EventEmitterService, ExporterEvents, $mdDialog) {
        var exportCompleted = this;
        exportCompleted.$onInit = onInit;
        exportCompleted.shown = true;
        exportCompleted.getIcon = getIcon;
        EventEmitterService.onComplete(ExporterEvents.GET_COMPLETED_EVENT, function (exports) {
            exportCompleted.isLoading = false;
            exportCompleted.exports = exports;
        });
        exportCompleted.removeExport = removeExport;
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

        function removeExport($event, exportTracker) {
            var confirm = $mdDialog.confirm()
                .title('Do you want to delete this export?')
                .textContent('Export ' + exportTracker.description + ' will be removed permanently.')
                .ariaLabel('deleteExport')
                .targetEvent($event)
                .ok('Yes')
                .cancel('No, wait!');
            $mdDialog.show(confirm).then(function () {
                exportTracker.isRemoving = true;
                EventEmitterService.emit(ExporterEvents.REMOVE_EXPORT_ITEM, exportTracker, function () {
                    EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
                });
            });
        }
    }
})();