(function () {
    'use strict';
    angular.module('app.faculty').run(Event);
    Event.$inject = [ '$rootScope', 'FacultyResourceService', 'FacultyEvents', 'vendors' ];

    function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
        $rootScope.$on(FacultyEvents.CREATE_FACULTY_DETAIL, function ($event, data,
                                                                       callback) {
            vendors.pace.restart();
            FacultyResourceService.createFacultyWithDetail({
                    facultyId: data.facultyId,
                    firstName: data.firstName, lastName: data.lastName,
                    middleName: data.middleName,
                    gender: data.gender, contactNo: data.contactNo,
                    emailAddress: data.emailAddress,
                    department: data.department,
                    imageId: data.imageId
                },
                function (err, result) {
                    if (!err) {
                        callback(undefined, result);
                    } else {
                        callback(err);
                        //TODO: alert error
                    }
                }
            )
            ;
        });
    }
})();