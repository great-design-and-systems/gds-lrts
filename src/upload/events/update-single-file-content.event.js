(function() {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'UploadEvents', 'UploadResourceService'];

    function Event($rootScope, UploadEvents, UploadResourceService) {
        $rootScope.$on(UploadEvents.UPDATE_SINGLE_FILE_CONTENT, function($event, data, callback) {
            UploadResourceService.updateSingleFileContent($rootScope.sessionUser, data.file, data.fileId, data.track, callback);
        });
    }
})();