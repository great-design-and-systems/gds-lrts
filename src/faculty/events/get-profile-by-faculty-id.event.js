(function() {
    'use strict';
    angular.module('app.faculty')
        .run(Event);
    Event.$inject = ['$rootScope', 'FacultyResourceService', 'FacultyEvents'];

    function Event($rootScope, FacultyResourceService, FacultyEvents) {
        $rootScope.$on(FacultyEvents.GET_PROFILE_BY_FACULTY_ID, function($event, data, callback) {
            FacultyResourceService.getProfileByFacultyId(data.facultyId, function(err, result) {
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