(function () {
    'use strict';
    angular.module('app.monitor')
        .run(CreateTodayRecordsExportEventService);
    CreateTodayRecordsExportEventService.$inject = ['$rootScope', 'MonitorEvents', 'vendors', 'GetTodayResourceService'];
    function CreateTodayRecordsExportEventService($rootScope, MonitorEvents, vendors, GetTodayResourceService) {
        $rootScope.$on(MonitorEvents.CREATE_TODAY_RECORDS_EXPORT_EVENT, function ($event, callback) {
            vendors.pace.restart();
            GetTodayResourceService.getTodayRecords(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    var exportTracker = {};
                    exportTracker.description = 'Logs as of ' + vendors.moment().format('llll');
                    exportTracker.limit = result.length;
                    exportTracker.items = result;
                    callback(undefined, exportTracker);
                }
            });
        });
    }
})();