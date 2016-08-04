(function () {
    'use strict';
    angular.module('app.monitor')
        .run(RefreshEventService);
    RefreshEventService.$inject = ['$rootScope', 'GetTodayResourceService', 'MonitorEvents', 'vendors'];
    function RefreshEventService($rootScope, GetTodayResourceService, MonitorEvents, vendors) {
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
})();