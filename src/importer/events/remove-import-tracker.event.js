(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.REMOVE_IMPORT_TRACKER, function($event, data, callback) {
            ImporterResourceService.removeImportTracker(data.importId,
                callback);
        });
    }
})();