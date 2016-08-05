(function () {
    'use strict';
    angular.module('app.exporter')
        .run(AddExportItemsCsvEventService);
    AddExportItemsCsvEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents', 'vendors'];

    function AddExportItemsCsvEventService($rootScope, ExporterResourceService, ExporterEvents, vendors) {
        $rootScope.$on(ExporterEvents.ADD_EXPORT_ITEMS_CSV, function ($event, data, callback) {
            vendors.pace.restart();
            ExporterResourceService.addExportItemsCSV(data.exportId, data.items, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();