(function() {
    'use strict';
    angular.module('app.students')
        .run(Event);
    Event.$inject = ['$rootScope', 'StudentsResourceService', 'StudentsEvents'];

    function Event($rootScope, StudentsResourceService, StudentsEvents) {
        $rootScope.$on(StudentsEvents.GET_PROFILE_BY_STUDENT_ID, function($event, data, callback) {
            StudentsResourceService.getProfileByStudentId(data.studentId, function(err, result) {
                if (!err) {
                    callback(undefined, result);
                } else {
                    callback(err);
                    //TODO: alert error
                }
            });
        });
    }
})();