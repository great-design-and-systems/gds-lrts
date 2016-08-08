(function() {
    angular.module('app.school')
        .component('educationLevelSetting', {
            templateUrl: 'src/school/setting/education-level-setting/education-level-setting.html',
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
        EventEmitterService.onComplete(SchoolEvents.GET_EDUCATION_LEVELS, getResponse);

        function onInit() {
            setting.isLoading = true;
            EventEmitterService.emit(SchoolEvents.GET_EDUCATION_LEVELS, function() {
                setting.isLoading = false;
            });
        }

        function getResponse(result) {
            if (result) {
                setting.educationLevels = result;
            } //TODO: alert errors
        }

        function dialogEventComplete(err, dialogData) {
            if (!err) {
                EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, $dialog) {
                    $dialog.then(function(result) {
                        EventEmitterService.emit(SchoolEvents.GET_EDUCATION_LEVELS);
                    }); //TODO: error show an alert message
                });
            }
        }

        function openConfirmEventComplete(err, createdConfirmDialogData) {
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, createdConfirmDialogData, function(err, $dialog) {
                $dialog.then(function() {
                    EventEmitterService.emit(SchoolEvents.DELETE_EDUCATION_LEVEL, createdConfirmDialogData.educationLevelId, function(err) {
                        if (!err) {
                            EventEmitterService.emit(SchoolEvents.GET_EDUCATION_LEVELS);
                        } //TODO: error show an alert message
                    });
                });
            });
        }

        function onSubmit() {
            if (setting.educationLevelInput) {
                var inputCurrentIndex = vendors.lodash.findIndex(setting.educationLevels, function(pred) {
                    return pred.name.toLowerCase() === setting.educationLevelInput.toLowerCase();
                });
                if (inputCurrentIndex === -1) {
                    EventEmitterService.emit(SchoolEvents.CREATE_EDUCATION_LEVEL, {
                        name: setting.educationLevelInput,
                        description: setting.educationLevelInput,
                        createdBy: 'SYSTEM' //TODO: use user id here
                    }, function(err) {
                        if (!err) {
                            setting.educationLevelInput = undefined;
                            EventEmitterService.emit(SchoolEvents.GET_EDUCATION_LEVELS);
                        } //TODO: error show an alert message
                    });
                }
            }
        }
    }
})();