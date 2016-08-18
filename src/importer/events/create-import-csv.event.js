(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.CREATE_IMPORT_CSV, function($event, data, callback) {
            ImporterResourceService.createImportCSV(data.description,
                data.fileId, data.dataFor,
                callback);
        });
    }
})();