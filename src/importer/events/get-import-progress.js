(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.GET_IN_PROGRESS_EVENT, function($event, callback) {
            ImporterResourceService.getImportProgress(callback);
        });
    }
})();