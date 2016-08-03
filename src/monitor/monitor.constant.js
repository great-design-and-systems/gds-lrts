(function () {
    'use strict';
    angular.module('app.monitor')
        .constant('MonitorEvents', {
            REFRESH_TODAY_RECORDS_EVENT: 'refreshTodayRecords',
            CREATE_TODAY_RECORDS_EXPORT_EVENT: 'createTodayRecordsExport'
        });
})();