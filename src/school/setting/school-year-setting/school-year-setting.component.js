(function() {
    angular.module('app.school')
        .component('schoolYearSetting', {
            templateUrl: 'src/school/setting/school-year-setting/school-year-setting.html',
            controller: SettingComponent,
            controllerAs: 'setting'
        });
    SettingComponent.$inject = ['EventEmitterService', 'SchoolEvents', 'AppEvents', 'vendors'];

    function SettingComponent(EventEmitterService, SchoolEvents, AppEvents, vendors) {
        var setting = this;
        setting.isLoading = false;
        setting.$onInit = onInit;
        setting.dialogEventComplete = dialogEventComplete;
        setting.openConfirmEventComplete = openConfirmEventComplete;
        setting.onSubmit = onSubmit;
        EventEmitterService.onComplete(SchoolEvents.GET_SCHOOL_YEARS, getResponse);

        function onInit() {
            setting.isLoading = true;
            EventEmitterService.emit(SchoolEvents.GET_SCHOOL_YEARS, function() {
                setting.isLoading = false;
            });
        }

        function getResponse(result) {
            if (result) {
                setting.schoolYears = result;
            } //TODO: alert errors
        }

        function dialogEventComplete(err, dialogData) {
            if (!err) {
                EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, $dialog) {
                    $dialog.then(function(result) {
                        EventEmitterService.emit(SchoolEvents.GET_SCHOOL_YEARS);
                    }); //TODO: error show an alert message
                });
            }
        }

        function openConfirmEventComplete(err, createdConfirmDialogData) {
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, createdConfirmDialogData, function(err, $dialog) {
                $dialog.then(function() {
                    EventEmitterService.emit(SchoolEvents.DELETE_SCHOOL_YEAR, createdConfirmDialogData.schoolYearId, function(err) {
                        if (!err) {
                            EventEmitterService.emit(SchoolEvents.GET_SCHOOL_YEARS);
                        } //TODO: error show an alert message
                    });
                });
            });
        }

        function onSubmit() {
            if (setting.schoolYearInput) {
                var inputCurrentIndex = vendors.lodash.findIndex(setting.schoolYears, function(pred) {
                    return pred.name.toLowerCase() === setting.schoolYearInput.toLowerCase();
                });
                if (inputCurrentIndex === -1) {
                    EventEmitterService.emit(SchoolEvents.CREATE_SCHOOL_YEAR, {
                        name: setting.schoolYearInput,
                        description: setting.schoolYearInput,
                        createdBy: 'SYSTEM' //TODO: use user id here
                    }, function(err) {
                        if (!err) {
                            setting.schoolYearInput = undefined;
                            EventEmitterService.emit(SchoolEvents.GET_SCHOOL_YEARS);
                        } //TODO: error show an alert message
                    });
                }
            }
        }
    }
})();