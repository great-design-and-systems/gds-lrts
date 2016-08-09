(function() {
    angular.module('app.school')
        .component('semesterSetting', {
            templateUrl: 'src/school/setting/semester-setting/semester-setting.html',
            controller: SettingComponent,
            controllerAs: 'setting',
            bindings: {
                schoolYear: '='
            }
        });
    SettingComponent.$inject = ['EventEmitterService', 'SchoolEvents', 'AppEvents', 'vendors'];

    function SettingComponent(EventEmitterService, SchoolEvents, AppEvents, vendors) {
        var setting = this;
        setting.isLoading = false;
        setting.$onInit = onInit;
        setting.dialogEventComplete = dialogEventComplete;
        setting.openConfirmEventComplete = openConfirmEventComplete;
        setting.onSubmit = onSubmit;
        EventEmitterService.onComplete(SchoolEvents.GET_SEMESTERS, getResponse);

        function onInit() {
            setting.isLoading = true;
            EventEmitterService.emit(SchoolEvents.GET_SEMESTERS, setting.schoolYear._id, function() {
                setting.isLoading = false;
            });
        }

        function getResponse(data) {
            if (data) {
                if (data.schoolYearId === setting.schoolYear._id) {
                    setting.semesters = data.result;
                }
            } //TODO: alert errors
        }

        function dialogEventComplete(err, dialogData) {
            if (!err) {
                EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, $dialog) {
                    $dialog.then(function() {
                        EventEmitterService.emit(SchoolEvents.GET_SEMESTERS, setting.schoolYear._id);
                    }); //TODO: error show an alert message
                });
            }
        }

        function openConfirmEventComplete(err, createdConfirmDialogData) {
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, createdConfirmDialogData, function(err, $dialog) {
                $dialog.then(function() {
                    EventEmitterService.emit(SchoolEvents.DELETE_SEMESTER, createdConfirmDialogData.semesterId, function(err) {
                        if (!err) {
                            EventEmitterService.emit(SchoolEvents.GET_SEMESTERS, setting.schoolYear._id);
                        } //TODO: error show an alert message
                    });
                });
            });
        }

        function onSubmit() {
            if (setting.semesterInput) {
                var inputCurrentIndex = vendors.lodash.findIndex(setting.semesters, function(pred) {
                    return pred.description.toLowerCase() === setting.semesterInput.toLowerCase();
                });
                if (inputCurrentIndex === -1) {
                    EventEmitterService.emit(SchoolEvents.OPEN_ADD_SEMESTER_DIALOG, {
                        schoolYearId: setting.schoolYear._id,
                        description: setting.semesterInput
                    }, function(err, dialog) {
                        dialogEventComplete(err, dialog);
                        setting.semesterInput = undefined;
                    });
                }
            }
        }
    }
})();