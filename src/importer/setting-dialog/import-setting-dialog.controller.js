(function() {
    'use strict';
    angular.module('app.importer')
        .controller('ImportSettingDialogController', ImportSettingDialogController);
    ImportSettingDialogController.$inject = ['$mdDialog', 'EventEmitterService', 'ImporterEvents'];

    function ImportSettingDialogController($mdDialog, EventEmitterService, ImporterEvents) {
        var importSettingDialog = this;
        importSettingDialog.isSubmitting = false;
        importSettingDialog.cancel = cancel;
        importSettingDialog.onFileChange = onFileChange;
        importSettingDialog.uploadData = {};
        importSettingDialog.uploadData.track = trackProgress;
        importSettingDialog.onUploadComplete = onUploadComplete;
        importSettingDialog.onUploadFail = onUploadFail;
        importSettingDialog.$onDestroy = destroy;

        function cancel() {
            $mdDialog.cancel();
        }

        function onFileChange() {
            importSettingDialog.uploadData.file = importSettingDialog.uploadFile;
        }

        function trackProgress(progress) {
            if (!importSettingDialog.isSubmitting) {
                importSettingDialog.isSubmitting = true;
            }
            importSettingDialog.progress = progress;
        }

        function onUploadComplete(err, result) {
            EventEmitterService.emit(ImporterEvents.CREATE_IMPORT_CSV, {
                description: importSettingDialog.uploadFile.name,
                fileId: result.fileId,
                dataFor: importSettingDialog.dataFor
            }, function(err, result) {
                importSettingDialog.isSubmitting = false;
                if (!err) {
                    EventEmitterService.emit(ImporterEvents.RUN_IMPORT_CSV, {
                        importId: result.importId
                    });
                    cancel();
                } //TODO: async alert error
            });
        }

        function onUploadFail(err) {
            if (err) {
                console.error('import-setting-dialog.controller', err);
            } //TODO: alert error
        }

        function destroy() {
            console.log('import-setting-dialog.controller: destoyed');
            importSettingDialog.isSubmitting = false;
            importSettingDialog.uploadData = {};
            importSettingDialog.uploadFile = undefined;
            importSettingDialog.progress = undefined;
        }
    }
})();