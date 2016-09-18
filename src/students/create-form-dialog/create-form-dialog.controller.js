(function () {
    'use strict';
    angular.module('app.students').controller('StudentCreateFormController', StudentCreateFormController);
    StudentCreateFormController.$inject = ['DownloaderService', 'EventEmitterService', 'UploadEvents', '$scope', 'FileEvents', 'StudentsEvents'];
    function StudentCreateFormController(DownloaderService, EventEmitterService, UploadEvents, $scope, FileEvents, StudentsEvents) {
        var createForm = this;
        createForm.save = save;
        createForm.onFileChange = onFileChange;
        createForm.cancelCreate = cancelCreate;
        createForm.data = {};
        $scope.$on('$destroy', destroy);
        function save() {
            EventEmitterService.emit(StudentsEvents.CREATE_STUDENT_DETAIL, createForm.data, function (err) {
                if (!err) {
                    createForm.hide();
                } else {
                    console.log('err', err);
                    if (err.data) {
                        createForm.message = err.data.message;
                    }
                }
                //TODO: alert for errors
            });
        }

        function onFileChange() {
            if (createForm.data.imageId) {
                EventEmitterService.emit(UploadEvents.UPDATE_SINGLE_FILE_CONTENT,
                    {
                        fileId: createForm.data.imageId,
                        file: createForm.uploadFile,
                        track: track
                    }, function () {
                        createForm.isSubmitting = false;
                        createForm.avatarLink = DownloaderService.createRawFileLink(createForm.data.imageId) +
                            '&cb=' + (new Date()).toString();
                    });
            } else {
                EventEmitterService.emit(UploadEvents.UPLOAD_SINGLE_FILE, {
                    file: createForm.uploadFile,
                    track: track
                }, function (err, result) {
                    createForm.isSubmitting = false;
                    createForm.data.imageId = result.fileId;
                    createForm.avatarLink = DownloaderService.createRawFileLink(result.fileId);
                });
            }

        }

        function track() {
            createForm.isSubmitting = true;
        }

        function destroy() {
            createForm.data = undefined;
            createForm.message = undefined;
        }

        function cancelCreate() {
            if (createForm.data.imageId) {
                createForm.isSubmitting = true;
                EventEmitterService.emit(FileEvents.DELETE_FILE, {
                    fileId: createForm.data.imageId
                }, function () {
                    createForm.isSubmitting = false;
                    createForm.cancel();
                });
            } else {
                createForm.cancel();
            }
        }
    }

})();