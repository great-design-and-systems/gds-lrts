(function () {
    'use strict';
    angular.module('app.exporter')
        .run(RefreshEventService);
    RefreshEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents', 'vendors'];
    function RefreshEventService($rootScope, ExporterResourceService, ExporterEvents, vendors) {
        $rootScope.$on(ExporterEvents.CREATE_EXPORT_CSV, function ($event, data, callback) {
            vendors.pace.restart();
            ExporterResourceService.createExportCSV(data.description, data.limit, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();