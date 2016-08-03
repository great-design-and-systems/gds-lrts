(function () {
    'use strict';
    angular.module('app.exporter')
        .service('CreateExportEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'ExporterResourceService', 'ExporterEvents', 'vendors'];

    function RefreshEventService($rootScope, ExporterResourceService, ExporterEvents, vendors) {
        return {
            execute: execute
        };
        function execute() {
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
    }

    RunService.$inject = ['CreateExportEventService'];
    function RunService(CreateExportEventService) {
        CreateExportEventService.execute();
    }

})();