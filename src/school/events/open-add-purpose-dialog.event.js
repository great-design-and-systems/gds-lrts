(function () {
    angular.module('app.school')
        .run(OpenAddPurposeDialog);
    OpenAddPurposeDialog.$inject = ['$rootScope', 'SchoolEvents'];
    function OpenAddPurposeDialog($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_ADD_PURPOSE_DIALOG, function ($event, callback) {
            var createPurposeDialogData = {
                controller: 'AddPurposeController',
                controllerAs: 'purposeForm',
                templateUrl: 'src/school/setting/purpose-setting/purpose-form-dialog.html'
            };
            callback(undefined, createPurposeDialogData);
        });
    }
})();