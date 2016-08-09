(function() {
    angular.module('app.school')
        .controller('AddSemesterController', AddSemesterController);
    AddSemesterController.$inject = ['$scope', '$mdDialog', 'EventEmitterService', 'SchoolEvents', 'vendors'];

    function AddSemesterController(scope, $mdDialog, EventEmitterService, SchoolEvents, vendors) {
        var form = this;
        form.title = 'New semester';
        form.submitLabel = 'Create';
        form.cancelLabel = 'Cancel';
        form.cancel = cancel;
        form.submit = submit;
        form.isSubmitting = false;

        function cancel() {
            $mdDialog.cancel();
        }

        function submit() {
            form.isSubmitting = true;
            EventEmitterService.emit(SchoolEvents.CREATE_SEMESTER, {
                schoolYearId: form.model.schoolYearId,
                description: form.model.description,
                dateStart: vendors.moment(form.model.dateStart).format('yyyy-MM-DD'),
                dateEnd: vendors.moment(form.model.dateEnd).format('yyyy-MM-DD'),
                createdBy: 'System' //USER_ID
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