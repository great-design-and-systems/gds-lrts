(function() {
    'use strict';
    angular.module('app.students')
        .constant('StudentsEvents', {
            GET_PROFILE_BY_STUDENT_ID: 'getProfileByStudentId'
        });
})();