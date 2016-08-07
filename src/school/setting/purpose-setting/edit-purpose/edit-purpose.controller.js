(function () {
    angular.module('app.school')
        .controller('EditPurposeController', EditPurposeController);
    EditPurposeController.$inject = ['$scope', '$mdDialog', 'EventEmitterService', 'SchoolEvents'];
    function EditPurposeController(scope, $mdDialog, EventEmitterService, SchoolEvents) {
        var purposeForm = this;
        purposeForm.title = 'Edit purpose';
        purposeForm.submitLabel = 'Update';
        purposeForm.cancelLabel = 'Cancel';
        purposeForm.cancel = cancel;
        purposeForm.submit = submit;
        function cancel() {
            $mdDialog.cancel();
        }
        function submit() {
            EventEmitterService.emit(SchoolEvents.EDIT_PURPOSE, {
                _id: purposeForm.purpose._id,
                codeName: purposeForm.purpose.codeValue,
                codeValue: purposeForm.purpose.codeValue,
                updatedBy: 'System'//USER_ID
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