(function () {
    'use strict';
    angular.module('app.monitor')
        .service('RefreshEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'GetTodayResourceService'];

    function RefreshEventService($rootScope, GetTodayResourceService) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on('refreshTodayRecords', function ($event, callback) {
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