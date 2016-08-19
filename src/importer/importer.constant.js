(function() {
    'use strict';
    angular.module('app.importer')
        .constant('ImporterEvents', {
            GET_IN_PROGRESS_EVENT: 'getInProgressEventImport',
            GET_COMPLETED_EVENT: 'getCompletedEventImport',
            GET_FAILED_EVENT: 'getFailedEventImport',
            GET_IMPORT_LOGS: 'getImportLogs',
            CREATE_IMPORT_CSV: 'createImportCSV',
            RUN_IMPORT_CSV: 'runImportCsv',
            REMOVE_IMPORT_TRACKER: 'removeImportTracker',
            IMPORTER_PROGRESS_LISTENER: 'importer-progress',
            IMPORTER_COMPLETED_LISTENER: 'importer-complete',
            IMPORTER_DELETED_LISTENER: 'importer-deleted',
            IMPORTER_FAILED_COMPLETED_LISTENER: 'importer-fail',
            NEW_IMPORT_CREATED_LISTENER: '$newImportCreated',
            OPEN_IMPORT_SETTING_DIALOG: 'openImportSettingDialog',
            OPEN_REMOVE_IMPORT_CONFIRM_DIALOG: 'openRemoveImportConfirmDialog'
        });
})();