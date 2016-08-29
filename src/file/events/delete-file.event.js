(function() {
    'use strict';
    angular.module('app.file')
        .run(Event);
    Event.$inject = ['$rootScope', 'FileResourceService', 'FileEvents'];

    function Event($rootScope, FileResourceService, FileEvents) {
        $rootScope.$on(FileEvents.DELETE_FILE, function($event, data, callback) {
            FileResourceService.deleteFile(data.fileId, callback);
        });
    }
})();