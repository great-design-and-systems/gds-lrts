(function() {
    'use strict';
    angular.module('app.faculty')
        .constant('FacultyEvents', {
            GET_PROFILE_BY_FACULTY_ID: 'getProfileByFacultyId',
            CREATE_FACULTY: 'createFaculty',
            UPDATE_FACULTY: 'updateFaculty',
            DELETE_FACULTY: 'deleteFaculty',
            GET_FACULTIES: 'getFaculties',
            OPEN_REMOVE_FACULTY_CONFIRM_DIALOG: 'openRemoveFacultyConfirmDialog'
        });
})();