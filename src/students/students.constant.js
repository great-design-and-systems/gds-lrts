(function() {
    'use strict';
    angular.module('app.students')
        .constant('StudentsEvents', {
            GET_PROFILE_BY_STUDENT_ID: 'getProfileByStudentId',
            CREATE_STUDENT: 'createStudent',
            UPDATE_STUDENT: 'updateStudent',
            DELETE_STUDENT: 'deleteStudent',
            GET_STUDENTS: 'getStudents',
            OPEN_REMOVE_STUDENT_CONFIRM_DIALOG: 'openRemoveStudentConfirmDialog'
        });
})();