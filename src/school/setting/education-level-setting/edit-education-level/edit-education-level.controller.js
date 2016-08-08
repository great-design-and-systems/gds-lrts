(function() {
    angular.module('app.school')
        .controller('EditEducationLevelController', EditEducationLevelController);
    EditEducationLevelController.$inject = ['$scope', '$mdDialog', 'EventEmitterService', 'SchoolEvents'];

    function EditEducationLevelController(scope, $mdDialog, EventEmitterService, SchoolEvents) {
        var form = this;
        form.title = 'Edit education level';
        form.submitLabel = 'Update';
        form.cancelLabel = 'Cancel';
        form.cancel = cancel;
        form.submit = submit;
        form.isSubmitting = false;

        function cancel() {
            $mdDialog.cancel();
        }

        function submit() {
            form.isSubmitting = true;
            EventEmitterService.emit(SchoolEvents.UPDATE_EDUCATION_LEVEL, {
                _id: form.model._id,
                name: form.model.name,
                description: form.model.name,
                updatedBy: 'System' //USER_ID
            }, function(err, result) {
                form.isSubmitting = false;
                if (!err) {
                    $mdDialog.hide(result);
                } else {
                    $mdDialog.cancel(err);
                }
            });
        }
    }
})();