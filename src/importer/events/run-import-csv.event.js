(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.RUN_IMPORT_CSV, function($event, data, callback) {
            ImporterResourceService.runImportCsv(data.importId,
                callback);
        });
    }
})();