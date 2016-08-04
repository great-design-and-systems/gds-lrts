(function () {
    'use strict';
    angular.module('app.exporter')
        .run(AddExportItemsCsvEventService);
    AddExportItemsCsvEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];

    function AddExportItemsCsvEventService($rootScope, ExporterResourceService, ExporterEvents) {
        $rootScope.$on(ExporterEvents.ADD_EXPORT_ITEMS_CSV, function ($event, data, callback) {
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