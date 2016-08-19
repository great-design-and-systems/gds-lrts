(function() {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'UploadEvents', 'UploadResourceService'];

    function Event($rootScope, UploadEvents, UploadResourceService) {
        $rootScope.$on(UploadEvents.UPLOAD_SINGLE_FILE, function($event, data, callback) {
            UploadResourceService.uploadSingleFile($rootScope.sessionUser, data.file, data.track, callback);
        });
    }
})();