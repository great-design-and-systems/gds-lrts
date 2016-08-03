(function () {
    'use strict';
    angular.module('app.exporter')
        .service('CreateExportEventService', RefreshEventService)
        .run(RunService);
    RefreshEventService.$inject = ['$rootScope', 'ExporterResourceService', 'CREATE_EXPORT_CSV'];

    function RefreshEventService($rootScope, ExporterResourceService, CREATE_EXPORT_CSV) {
        return {
            execute: execute
        };
        function execute() {
            $rootScope.$on(CREATE_EXPORT_CSV, function ($event, data, callback) {
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