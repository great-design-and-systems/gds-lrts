(function () {
    'use strict';
    angular.module('app.students').run(Event);
    Event.$inject = ['$rootScope', 'StudentsResourceService', 'StudentsEvents', 'vendors'];

    function Event($rootScope, StudentsResourceService, StudentsEvents, vendors) {
        $rootScope.$on(StudentsEvents.CREATE_STUDENT_DETAIL, function ($event, data,
                                                                       callback) {
            vendors.pace.restart();
            StudentsResourceService.createStudentWithDetail({
                    studentId: data.studentId,
                    firstName: data.firstName, lastName: data.lastName,
                    middleName: data.middleName,
                    gender: data.gender, contactNo: data.contactNo,
                    emailAddress: data.emailAddress,
                    department: data.department, level: data.level,
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