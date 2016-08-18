(function() {
    'use strict';
    angular.module('app.importer')
        .constant('ImporterEvents', {
            GET_IN_PROGRESS_EVENT: 'getInProgressEvent',
            GET_COMPLETED_EVENT: 'getCompletedEvent',
            GET_FAILED_EVENT: 'getFailedEvent',
            CREATE_IMPORT_CSV: 'createImportCSV',
            ADD_IMPORT_ITEMS_CSV: 'addImportItemsCSV',
            REMOVE_IMPORT_ITEM: 'removeImportTrackerById',
            IMPORTER_PROGRESS_LISTENER: 'importer-progress',
            IMPORTER_COMPLETED_LISTENER: 'importer-complete',
            IMPORTER_DELETED_LISTENER: 'importer-deleted',
            IMPORTER_FAILED_COMPLETED_LISTENER: 'importer-fail'
        });
})();