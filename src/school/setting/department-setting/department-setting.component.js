(function() {
    angular.module('app.school')
        .component('purposeSetting', {
            templateUrl: 'src/school/setting/department-setting/department-setting.html',
            controller: PurposeSettingComponent,
            controllerAs: 'purposeSetting'
        });
    PurposeSettingComponent.$inject = ['EventEmitterService', 'SchoolEvents', 'AppEvents', 'CodeEvents', 'vendors'];

    function PurposeSettingComponent(EventEmitterService, SchoolEvents, AppEvents, CodeEvents, vendors) {
        var purposeSetting = this;
        purposeSetting.isLoading = false;
        purposeSetting.$onInit = onInit;
        purposeSetting.purposeDialogEventComplete = purposeDialogEventComplete;
        purposeSetting.purposeOpenConfirmEventComplete = purposeOpenConfirmEventComplete;
        purposeSetting.onSubmit = onSubmit;
        EventEmitterService.onComplete(SchoolEvents.GET_PURPOSES, getPurposesResponse);

        function onInit() {
            purposeSetting.isLoading = true;
            EventEmitterService.emit(SchoolEvents.GET_PURPOSES, function() {
                purposeSetting.isLoading = false;
            });
        }

        function getPurposesResponse(purposes) {
            if (purposes) {
                purposeSetting.purposes = purposes;
            }
        }

        function purposeDialogEventComplete(err, createPurposeDialogData) {
            if (!err) {
                console.log('createPurposeDialogData', createPurposeDialogData);
                EventEmitterService.emit(AppEvents.OPEN_DIALOG, createPurposeDialogData, function(err, $dialog) {
                    $dialog.then(function(result) {
                        EventEmitterService.emit(SchoolEvents.GET_PURPOSES);
                    }); //TODO: error show an alert message
                });
            }
        }

        function purposeOpenConfirmEventComplete(err, createdConfirmDialogData) {
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, createdConfirmDialogData, function(err, $dialog) {
                $dialog.then(function() {
                    EventEmitterService.emit(CodeEvents.DELETE_CODE, createdConfirmDialogData.purposeId, function(err) {
                        if (!err) {
                            EventEmitterService.emit(SchoolEvents.GET_PURPOSES);
                        } //TODO: error show an alert message
                    });
                });
            });
        }

        function onSubmit() {
            if (purposeSetting.purposeInput) {
                var inputCurrentIndex = vendors.lodash.findIndex(purposeSetting.purposes, function(pred) {
                    return pred.codeName.toLowerCase() === purposeSetting.purposeInput.toLowerCase() ||
                        pred.codeValue.toLowerCase() === purposeSetting.purposeInput.toLowerCase();
                });
                if (inputCurrentIndex === -1) {
                    EventEmitterService.emit(SchoolEvents.CREATE_PURPOSE, {
                        codeName: purposeSetting.purposeInput,
                        codeValue: purposeSetting.purposeInput,
                        createdBy: 'SYSTEM'
                    }, function(err) {
                        if (!err) {
                            purposeSetting.purposeInput = undefined;
                            EventEmitterService.emit(SchoolEvents.GET_PURPOSES);
                        } //TODO: error show an alert message
                    });
                }
            }
        }
    }
})();