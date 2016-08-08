(function() {
    angular.module('app.school')
        .constant('SchoolEvents', {
            GET_PURPOSES: 'getPurposes',
            OPEN_ADD_PURPOSE_DIALOG: 'openAddPurposeDialog',
            CREATE_PURPOSE: 'createPurpose',
            EDIT_PURPOSE: 'editPurpose',
            OPEN_EDIT_PURPOSE_DIALOG: 'openEditPurposeDialog',
            OPEN_REMOVE_PURPOSE_CONFIRM_DIALOG: 'openRemovePurposeConfirmDialog',
            CREATE_DEPARTMENT: 'createDepartment',
            UPDATE_DEPARTMENT: 'updateDepartment',
            GET_DEPARTMENTS: 'getDepartments',
            DELETE_DEPARTMENT: 'deleteDepartment',
            OPEN_EDIT_DEPARTMENT_DIALOG: 'openEditDepartmentDialog',
            OPEN_REMOVE_DEPARTMENT_CONFIRM_DIALOG: 'openRemoveDepartmentConfirmDialog',
            CREATE_EDUCATION_LEVEL: 'createEducationLevel',
            UPDATE_EDUCATION_LEVEL: 'updateEducationLevel',
            GET_EDUCATION_LEVELS: 'getEducationLevels',
            DELETE_EDUCATION_LEVEL: 'deleteEducationLevel',
            OPEN_EDIT_EDUCATION_LEVEL_DIALOG: 'openEditEducationLevelDialog',
            OPEN_REMOVE_EDUCATION_LEVEL_CONFIRM_DIALOG: 'openRemoveEducationLevelConfirmDialog',
            CREATE_SCHOOL_YEAR: 'createSchoolYear',
            UPDATE_SCHOOL_YEAR: 'updateSchoolYear',
            GET_SCHOOL_YEARS: 'getSchoolYears',
            DELETE_SCHOOL_YEAR: 'deleteSchoolYear',
            OPEN_EDIT_SCHOOL_YEAR_DIALOG: 'openEditSchoolYearDialog',
            OPEN_REMOVE_SCHOOL_YEAR_CONFIRM_DIALOG: 'openRemoveSchoolYearConfirmDialog'
        });
})();