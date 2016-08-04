(function () {
    'use strict';
    angular.module('app.exporter')
        .run(GetExportCompletedEventService);
    GetExportCompletedEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];
    function GetExportCompletedEventService($rootScope, ExporterResourceService, ExporterEvents) {
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

})();