(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterResourceService', 'ImporterEvents'];

    function Event($rootScope, ImporterResourceService, ImporterEvents) {
        $rootScope.$on(ImporterEvents.GET_COMPLETED_EVENT, function($event, callback) {
            ImporterResourceService.getImportCompleted(callback);
        });
    }
})();