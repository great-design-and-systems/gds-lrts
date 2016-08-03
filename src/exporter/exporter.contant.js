(function () {
    'use strict';
    angular.module('app.exporter')
        .constant('ExporterEvents', {
            GET_IN_PROGRESS_EVENT: 'getInProgressEvent',
            GET_COMPLETED_EVENT: 'getCompletedEvent',
            CREATE_EXPORT_CSV: 'createExportCSV',
            ADD_EXPORT_ITEMS_CSV: 'addExportItemsCSV',
            EXPORTER_PROGRESS_LISTENER: 'exporter-progress',
            EXPORTER_COMPLETED_LISTENER: 'exporter-complete'
        });
})();