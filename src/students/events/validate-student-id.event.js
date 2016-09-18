(function () {
    'use strict';
    angular.module('app.students').run(Event);
    Event.$inject = ['$rootScope', 'StudentsResourceService', 'StudentsEvents', 'vendors'];

    function Event($rootScope, StudentsResourceService, StudentsEvents, vendors) {
        $rootScope.$on(StudentsEvents.VALIDATE_STUDENT_ID, function ($event, data,
                                                                     callback) {
            vendors.pace.restart();
            StudentsResourceService.validateStudentId(data.studentId, function (err, result) {
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