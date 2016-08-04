(function () {
    'use strict';
    angular.module('app.exporter')
        .run(AddExportItemsCsvEventService);
    AddExportItemsCsvEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];
    function AddExportItemsCsvEventService($rootScope, ExporterResourceService, ExporterEvents) {
        $rootScope.$on(ExporterEvents.REMOVE_EXPORT_ITEM, function ($event, data, callback) {
            ExporterResourceService.removeExportTrackerById(data._id, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();