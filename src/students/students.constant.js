(function () {
    'use strict';
    angular.module('app.students')
        .constant('StudentsEvents', {
            GET_PROFILE_BY_STUDENT_ID: 'getProfileByStudentId',
            CREATE_STUDENT: 'createStudent',
            CREATE_STUDENT_DETAIL: 'createStudentDetail',
            UPDATE_STUDENT: 'updateStudent',
            DELETE_STUDENT: 'deleteStudent',
            GET_STUDENTS: 'getStudents',
            VALIDATE_STUDENT_ID: 'validateStudentId',
            OPEN_REMOVE_STUDENT_CONFIRM_DIALOG: 'openRemoveStudentConfirmDialog',
            OPEN_IMAGE_UPLOAD_FOR_STUDENT_DIALOG: 'openImageUploadForStudentDialog',
            OPEN_CREATE_STUDENT_FORM_DIALOG: 'openCreateStudentFromDialog',
            OPEN_EDIT_STUDENT_FORM_DIALOG: 'openEditStudentFormDialog'
        });
})();