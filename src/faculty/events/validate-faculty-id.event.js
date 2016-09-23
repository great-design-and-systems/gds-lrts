(function () {
    'use strict';
    angular.module('app.faculty').run(Event);
    Event.$inject = ['$rootScope', 'FacultyResourceService', 'FacultyEvents', 'vendors'];

    function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
        $rootScope.$on(FacultyEvents.VALIDATE_FACULTY_ID, function ($event, data,
                                                                     callback) {
            vendors.pace.restart();
            FacultyResourceService.validateFacultyId(data.facultyId, function (err, result) {
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