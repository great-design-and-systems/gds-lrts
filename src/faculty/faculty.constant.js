(function() {
    'use strict';
    angular.module('app.faculty')
        .constant('FacultyEvents', {
            GET_PROFILE_BY_FACULTY_ID: 'getProfileByFacultyId',
            CREATE_FACULTY: 'createFaculty',
            CREATE_FACULTY_DETAIL: 'createFacultyDetail',
            UPDATE_FACULTY: 'updateFaculty',
            DELETE_FACULTY: 'deleteFaculty',
            GET_FACULTIES: 'getFaculties',
            OPEN_REMOVE_FACULTY_CONFIRM_DIALOG: 'openRemoveFacultyConfirmDialog',
            OPEN_IMAGE_UPLOAD_FOR_FACULTY_DIALOG: 'openImageUploadForFacultyDialog',
            OPEN_CREATE_FACULTY_FORM_DIALOG: 'openCreateFacultyFormDialog',
            OPEN_EDIT_FACULTY_FORM_DIALOG: 'openEditFacultyFormDialog'
        });
})();