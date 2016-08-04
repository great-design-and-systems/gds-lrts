(function () {
    'use strict';
    angular.module('app.exporter')
        .run(GetExportInProgressEventService);
    GetExportInProgressEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];
    function GetExportInProgressEventService($rootScope, ExporterResourceService, ExporterEvents) {
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

})();