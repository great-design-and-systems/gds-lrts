(function () {
    angular.module('app.school')
        .controller('SchoolIdLockDialogController', SchoolIdLockDialogController);
    SchoolIdLockDialogController.$inject = ['$rootScope', '$mdDialog', 'SCHOOL_ID'];
    function SchoolIdLockDialogController($rootScope, $mdDialog, SCHOOL_ID) {
        var schoolIdLockDialog = this;
        schoolIdLockDialog.cancel = cancel;
        schoolIdLockDialog.validate = validate;
        function cancel() {
            $mdDialog.cancel();
        }

        function validate() {
            if (schoolIdLockDialog.idToValidate === SCHOOL_ID) {
                $mdDialog.hide(schoolIdLockDialog.idToValidate);
            }
        }
    }
})();