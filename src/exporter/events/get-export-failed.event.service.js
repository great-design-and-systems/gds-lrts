(function () {
    'use strict';
    angular.module('app.exporter')
        .run(GetExportCompletedEventService);
    GetExportCompletedEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];
    function GetExportCompletedEventService($rootScope, ExporterResourceService, ExporterEvents) {
        $rootScope.$on(ExporterEvents.GET_FAILED_EVENT, function ($event, callback) {
            ExporterResourceService.getExportFailed(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();