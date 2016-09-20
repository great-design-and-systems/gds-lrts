(function () {
    'use strict';
    angular.module('app.students').controller('StudentEditFormController', StudentEditFormController);
    StudentEditFormController.$inject = ['DownloaderService', 'EventEmitterService', 'UploadEvents', '$scope', 'FileEvents', 'StudentsEvents'];
    function StudentEditFormController(DownloaderService, EventEmitterService, UploadEvents, $scope, FileEvents, StudentsEvents) {
        var editForm = this;
        editForm.save = save;
        editForm.onFileChange = onFileChange;
        editForm.cancelCreate = cancelCreate;
        //editForm.data = {};
        $scope.$on('$destroy', destroy);
        function save() {
            EventEmitterService.emit(StudentsEvents.UPDATE_STUDENT, editForm.data, function (err) {
                if (!err) {
                    editForm.hide();
                } else {
                    console.log('err', err);
                    if (err.data) {
                        editForm.message = err.data.message;
                    }
                }
                //TODO: alert for errors
            });
        }

        function onFileChange() {
            if (editForm.data.imageId) {
                EventEmitterService.emit(UploadEvents.UPDATE_SINGLE_FILE_CONTENT,
                    {
                        fileId: editForm.data.imageId,
                        file: editForm.uploadFile,
                        track: track
                    }, function () {
                        editForm.isSubmitting = false;
                        editForm.avatarLink = DownloaderService.createRawFileLink(editForm.data.imageId) +
                            '&cb=' + (new Date()).toString();
                    });
            } else {
                EventEmitterService.emit(UploadEvents.UPLOAD_SINGLE_FILE, {
                    file: editForm.uploadFile,
                    track: track
                }, function (err, result) {
                    editForm.isSubmitting = false;
                    editForm.data.imageId = result.fileId;
                    editForm.avatarLink = DownloaderService.createRawFileLink(result.fileId);
                });
            }

        }

        function track() {
            editForm.isSubmitting = true;
        }

        function destroy() {
            editForm.data = undefined;
            editForm.message = undefined;
        }

        function cancelCreate() {
            if (editForm.data.imageId) {
                editForm.isSubmitting = true;
                EventEmitterService.emit(FileEvents.DELETE_FILE, {
                    fileId: editForm.data.imageId
                }, function () {
                    editForm.isSubmitting = false;
                    editForm.cancel();
                });
            } else {
                editForm.cancel();
            }
        }
    }

})();