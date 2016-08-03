(function () {
    'use strict';
    angular.module('app.monitor')
        .service('CreateTodayRecordsExportEventService', CreateTodayRecordsExportEventService)
        .run(RunService);
    CreateTodayRecordsExportEventService.$inject = ['$rootScope', 'MonitorEvents', 'vendors', 'GetTodayResourceService'];

    function CreateTodayRecordsExportEventService($rootScope, MonitorEvents, vendors, GetTodayResourceService) {
        return {
            execute: execute
        };
        function execute() {
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
    }

    RunService.$inject = ['CreateTodayRecordsExportEventService'];
    function RunService(CreateTodayRecordsExportEventService) {
        CreateTodayRecordsExportEventService.execute();
    }

})();