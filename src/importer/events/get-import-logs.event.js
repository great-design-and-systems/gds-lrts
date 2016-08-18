(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.GET_IMPORT_LOGS, function($event, data, callback) {
            ImporterResourceService.getImportLogs(data.importId, callback);
        });
    }
})();