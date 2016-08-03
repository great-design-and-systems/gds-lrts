(function () {
    'use strict';
    angular.module('app.exporter')
        .service('AddExportItemsCsvEventService', AddExportItemsCsvEventService)
        .run(RunService);
    AddExportItemsCsvEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents'];

    function AddExportItemsCsvEventService($rootScope, ExporterResourceService, ExporterEvents) {
        return {
            execute: execute
        };
        function execute() {
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
    }

    RunService.$inject = ['AddExportItemsCsvEventService'];
    function RunService(AddExportItemsCsvEventService) {
        AddExportItemsCsvEventService.execute();
    }

})();