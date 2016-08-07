(function () {
    angular.module('app.school')
        .run(OpenAddPurposeDialog);
    OpenAddPurposeDialog.$inject = ['$rootScope', 'SchoolEvents'];
    function OpenAddPurposeDialog($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_REMOVE_PURPOSE_CONFIRM_DIALOG, function ($event, purpose, callback) {
            var openRemovePurposeConfirmDialog = {
                title: 'Do you want to remove ' + purpose.codeValue + '?',
                textContent: 'This purpose will be removed permanently.',
                ok: 'Yes',
                cancel: 'No, wait!',
                ariaLabel: 'Remove purpose dialog',
                purposeId: purpose._id
            };
            callback(undefined, openRemovePurposeConfirmDialog);
        });
    }
})();