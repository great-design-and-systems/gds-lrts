(function () {
    'use strict';
    angular.module('app.exporter')
        .service('GetExportInProgressEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'ExporterResourceService'];

    function RefreshEventService($rootScope, ExporterResourceService) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on('getExportInProgress', function ($event, callback) {
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