(function () {
    'use strict';
    angular.module('app.exporter')
        .service('GetExportCompletedEventService', GetExportCompletedEventService)
        .run(RunService);
    GetExportCompletedEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];
    function GetExportCompletedEventService($rootScope, ExporterResourceService, ExporterEvents) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on(ExporterEvents.GET_COMPLETED_EVENT, function ($event, callback) {
                ExporterResourceService.getExportCompleted(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, result);
                    }
                });
            });
        }
    }

    RunService.$inject = ['GetExportCompletedEventService'];
    function RunService(GetExportCompletedEventService) {
        GetExportCompletedEventService.execute();
    }

})();