(function () {
    'use strict';
    angular.module('app.monitor')
        .service('RefreshEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'GetTodayResourceService', 'MonitorEvents', 'vendors'];

    function RefreshEventService($rootScope, GetTodayResourceService, MonitorEvents, vendors) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on(MonitorEvents.REFRESH_TODAY_RECORDS_EVENT, function ($event, callback) {
                vendors.pace.restart();
                GetTodayResourceService.getTodayRecords(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, result);
                    }
                });
            });
        }
    }

    RunService.$inject = ['RefreshEventService'];
    function RunService(RefreshEventService) {
        RefreshEventService.execute();
    }

})();