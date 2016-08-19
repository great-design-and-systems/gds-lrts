(function() {
    'use strict';
    angular.module('app.importer')
        .component('importLogs', {
            templateUrl: 'src/importer/logs/import-logs.html',
            controller: ImportLogsComponent,
            controllerAs: 'importLogs',
            bindings: {
                importId: '<'
            }
        });
    ImportLogsComponent.$inject = ['EventEmitterService', 'ImporterEvents'];

    function ImportLogsComponent(EventEmitterService, ImporterEvents) {
        var importLogs = this;
        importLogs.$onInit = onInit;
        importLogs.$destroy = destroy;

        EventEmitterService.onComplete(ImporterEvents.GET_IMPORT_LOGS, function(logs) {
            importLogs.isLoading = false;
            importLogs.logs = logs;
        });

        function onInit() {
            importLogs.isLoading = true;
            EventEmitterService.emit(ImporterEvents.GET_IMPORT_LOGS, {
                importId: importLogs.importId
            });
        }

        function destroy() {
            importLogs.logs = undefined;
        }
    }
})();