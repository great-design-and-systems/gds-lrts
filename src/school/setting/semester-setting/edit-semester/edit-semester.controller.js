(function() {
    angular.module('app.school')
        .controller('EditSemesterController', EditSemesterController);
    EditSemesterController.$inject = ['$scope', '$mdDialog', 'EventEmitterService', 'SchoolEvents', 'vendors'];

    function EditSemesterController(scope, $mdDialog, EventEmitterService, SchoolEvents, vendors) {
        var form = this;
        form.title = 'Edit semester';
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
            EventEmitterService.emit(SchoolEvents.UPDATE_SEMESTER, {
                _id: form.model._id,
                description: form.model.description,
                dateStart: vendors.moment(form.model.dateStart).format('yyyy-MM-DD'),
                dateEnd: vendors.moment(form.model.dateEnd).format('yyyy-MM-DD'),
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