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
    }

    RunService.$inject = ['AddExportItemsCsvEventService'];
    function RunService(AddExportItemsCsvEventService) {
        AddExportItemsCsvEventService.execute();
    }

})();