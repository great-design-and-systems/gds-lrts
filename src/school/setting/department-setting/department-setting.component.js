(function() {
    angular.module('app.school')
        .component('departmentSetting', {
            templateUrl: 'src/school/setting/department-setting/department-setting.html',
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
        EventEmitterService.onComplete(SchoolEvents.GET_DEPARTMENTS, getResponse);

        function onInit() {
            setting.isLoading = true;
            EventEmitterService.emit(SchoolEvents.GET_DEPARTMENTS, function() {
                setting.isLoading = false;
            });
        }

        function getResponse(result) {
            if (result) {
                setting.departments = result;
            } //TODO: alert errors
        }

        function dialogEventComplete(err, dialogData) {
            if (!err) {
                EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, $dialog) {
                    $dialog.then(function(result) {
                        EventEmitterService.emit(SchoolEvents.GET_DEPARTMENTS);
                    }); //TODO: error show an alert message
                });
            }
        }

        function openConfirmEventComplete(err, createdConfirmDialogData) {
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, createdConfirmDialogData, function(err, $dialog) {
                $dialog.then(function() {
                    EventEmitterService.emit(SchoolEvents.DELETE_DEPARTMENT, createdConfirmDialogData.departmentId, function(err) {
                        if (!err) {
                            EventEmitterService.emit(SchoolEvents.GET_DEPARTMENTS);
                        } //TODO: error show an alert message
                    });
                });
            });
        }

        function onSubmit() {
            if (setting.departmentInput) {
                var inputCurrentIndex = vendors.lodash.findIndex(setting.departments, function(pred) {
                    return pred.name.toLowerCase() === setting.departmentInput.toLowerCase();
                });
                if (inputCurrentIndex === -1) {
                    EventEmitterService.emit(SchoolEvents.CREATE_DEPARTMENT, {
                        name: setting.departmentInput,
                        description: setting.departmentInput,
                        createdBy: 'SYSTEM' //TODO: use user id here
                    }, function(err) {
                        if (!err) {
                            setting.departmentInput = undefined;
                            EventEmitterService.emit(SchoolEvents.GET_DEPARTMENTS);
                        } //TODO: error show an alert message
                    });
                }
            }
        }
    }
})();