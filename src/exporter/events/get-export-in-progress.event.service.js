(function () {
    'use strict';
    angular.module('app.exporter')
        .service('GetExportInProgressEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'ExporterResourceService', 'GET_IN_PROGRESS_EVENT'];

    function RefreshEventService($rootScope, ExporterResourceService, GET_IN_PROGRESS_EVENT) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on(GET_IN_PROGRESS_EVENT, function ($event, callback) {
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