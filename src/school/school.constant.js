(function () {
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
            DELETE_DEPARTMENT: 'deleteDepartment'
        });
})();