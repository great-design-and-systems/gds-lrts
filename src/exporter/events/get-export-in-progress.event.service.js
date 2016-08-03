(function () {
    'use strict';
    angular.module('app.exporter')
        .service('GetExportInProgressEventService', GetExportInProgressEventService)
        .run(RunService);
    GetExportInProgressEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];

    function GetExportInProgressEventService($rootScope, ExporterResourceService, ExporterEvents) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on(ExporterEvents.GET_IN_PROGRESS_EVENT, function ($event, callback) {
                ExporterResourceService.getExportInProgress(function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, result);
                    }
                });
            });
        }
    }

    RunService.$inject = ['GetExportInProgressEventService'];
    function RunService(GetExportInProgressEventService) {
        GetExportInProgressEventService.execute();
    }

})();