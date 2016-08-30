(function() {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'UploadEvents', 'FacultyEvents', 'EventEmitterService'];

    function Event($rootScope, UploadEvents, FacultyEvents, EventEmitterService) {
        $rootScope.$on(FacultyEvents.OPEN_IMAGE_UPLOAD_FOR_FACULTY_DIALOG, function($event, data, callback) {
            EventEmitterService.emit(UploadEvents.UPLOAD_IMAGE_DIALOG, data, function(err) {
                if (!err) {
                    EventEmitterService.emit(FacultyEvents.UPDATE_FACULTY, data, callback);
                } else {
                    callback(err);
                }
            });
        });
    }
})();