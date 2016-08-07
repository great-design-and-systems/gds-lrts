(function () {
    angular.module('app.school')
        .controller('AddPurposeController', AddPurposeController);
    AddPurposeController.$inject = ['$mdDialog', 'EventEmitterService', 'SchoolEvents'];
    function AddPurposeController($mdDialog, EventEmitterService, SchoolEvents) {
        var purposeForm = this;
        purposeForm.title = 'Create purpose';
        purposeForm.submitLabel = 'Add';
        purposeForm.cancelLabel = 'Cancel';
        purposeForm.cancel = cancel;
        purposeForm.submit = submit;
        function cancel() {
            $mdDialog.cancel();
        }

        function submit() {
            EventEmitterService.emit(SchoolEvents.CREATE_PURPOSE, {
                codeName: purposeForm.purpose.codeValue,
                codeValue: purposeForm.purpose.codeValue,
                createdBy: 'System'//USER_ID
            }, function (err, result) {
                if (!err) {
                    $mdDialog.hide(result);
                } else {
                    $mdDialog.cancel(err);
                }
            });
        }
    }
})();