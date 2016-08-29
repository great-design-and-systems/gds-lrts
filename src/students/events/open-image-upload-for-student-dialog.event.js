(function() {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'UploadEvents', 'StudentsEvents', 'EventEmitterService'];

    function Event($rootScope, UploadEvents, StudentsEvents, EventEmitterService) {
        $rootScope.$on(StudentsEvents.OPEN_IMAGE_UPLOAD_FOR_STUDENT_DIALOG, function($event, data, callback) {
            EventEmitterService.emit(UploadEvents.UPLOAD_IMAGE_DIALOG, data, function(err) {
                if (!err) {
                    EventEmitterService.emit(StudentsEvents.UPDATE_STUDENT, data, callback);
                } else {
                    callback(err);
                }
            });
        });
    }
})();