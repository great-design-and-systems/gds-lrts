(function() {
    'use strict';
    angular.module('app.importer')
        .constant('ImporterEvents', {
            GET_IN_PROGRESS_EVENT: 'getInProgressEvent',
            GET_COMPLETED_EVENT: 'getCompletedEvent',
            GET_FAILED_EVENT: 'getFailedEvent',
            GET_IMPORT_LOGS: 'getImportLogs',
            CREATE_IMPORT_CSV: 'createImportCSV',
            RUN_IMPORT_CSV: 'runImportCsv',
            REMOVE_IMPORT_TRACKER: 'removeImportTracker',
            IMPORTER_PROGRESS_LISTENER: 'importer-progress',
            IMPORTER_COMPLETED_LISTENER: 'importer-complete',
            IMPORTER_DELETED_LISTENER: 'importer-deleted',
            IMPORTER_FAILED_COMPLETED_LISTENER: 'importer-fail'
        });
})();