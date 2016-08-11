(function() {
    'use strict';
    angular.module('gdsApp')
        .constant('AppEvents', {
            OPEN_DIALOG: 'openDialog',
            OPEN_DIALOG_CONFIRM: 'openDialogConfirm'
        })
        .constant('SESSION_TOKEN', 'GDSSESSIONID')
        .constant('SESSION_USER', 'SESSIONUSER')
        .constant('API_HOST', '#API_HOST')
        .constant('SCANNER_CONTEXT', '#SCANNER_CONTEXT')
        .constant('TIME_CONTEXT', '#TIME_CONTEXT')
        .constant('SCHOOL_CONTEXT', '#SCHOOL_CONTEXT')
        .constant('EXPORT_CONTEXT', '#EXPORT_CONTEXT')
        .constant('FILE_CONTEXT', '#FILE_CONTEXT')
        .constant('SCHOOL_ID', '#SCHOOL_ID')
        .constant('LOGIN_CONTEXT', '#LOGIN_CONTEXT')
        .constant('USER_CONTEXT', '#USER_CONTEXT');
})();