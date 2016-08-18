(function () {
    'use strict';
    angular.module('app.exporter')
        .constant('ExporterEvents', {
            GET_IN_PROGRESS_EVENT: 'getInProgressEvent',
            GET_COMPLETED_EVENT: 'getCompletedEvent',
            GET_FAILED_EVENT: 'getFailedEvent',
            CREATE_EXPORT_CSV: 'createExportCSV',
            ADD_EXPORT_ITEMS_CSV: 'addExportItemsCSV',
            REMOVE_EXPORT_ITEM: 'removeExportTrackerById',
            EXPORTER_PROGRESS_LISTENER: 'exporter-progress',
            EXPORTER_COMPLETED_LISTENER: 'exporter-complete',
            EXPORTER_DELETED_LISTENER: 'exporter-deleted',
            EXPORTER_FAILED_COMPLETED_LISTENER: 'exporter-fail'
        });
})();