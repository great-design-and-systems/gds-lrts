(function () {
    angular.module('app.school')
        .run(OpenAddPurposeDialog);
    OpenAddPurposeDialog.$inject = ['$rootScope', 'SchoolEvents'];
    function OpenAddPurposeDialog($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_EDIT_PURPOSE_DIALOG, function ($event, data, callback) {
            var createPurposeDialogData = {
                controller: 'EditPurposeController',
                controllerAs: 'purposeForm',
                templateUrl: 'src/school/setting/purpose-setting/purpose-form-dialog.html',
                locals: {
                    purpose: data
                },
                bindToController: true
            };
            callback(undefined, createPurposeDialogData);
        });
    }
})();