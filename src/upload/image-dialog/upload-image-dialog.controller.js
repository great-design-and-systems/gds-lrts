(function() {
    'use strict';
    angular.module('app.upload')
        .controller('UploadImageDialogController', UploadImageDialogController);
    UploadImageDialogController.$inject = ['$scope', '$cacheFactory', 'DownloaderService', 'EventEmitterService', 'FileEvents', 'UploadEvents'];

    function UploadImageDialogController($scope, $cacheFactory, DownloaderService, EventEmitterService, FileEvents, UploadEvents) {
        var uploadImageDialog = this;
        uploadImageDialog.submitLabel = 'Save';
        uploadImageDialog.cancelLabel = 'Cancel';
        uploadImageDialog.title = 'Upload Image';
        $scope.$on('$destroy', onDestroy);
        uploadImageDialog.save = save;
        uploadImageDialog.cancelUpload = cancelUpload;
        uploadImageDialog.onFileChange = onFileChange;
        var fileUpload = {};
        fileUpload.track = track;
        onInit();

        function onInit() {
            if (uploadImageDialog.data.imageId) {
                uploadImageDialog.avatarLink = DownloaderService.createRawFileLink(uploadImageDialog.data.imageId) + '&cb=' + (new Date()).toString();
            }
        }

        function onDestroy() {
            uploadImageDialog = {};
            fileUpload = {};
        }

        function save() {
            uploadImageDialog.hide(uploadImageDialog.fileId);
        }

        function cancelUpload() {
            uploadImageDialog.cancel();
            if (uploadImageDialog.fileId) {
                EventEmitterService.emit(FileEvents.DELETE_FILE, {
                    fileId: uploadImageDialog.fileId
                });
            }
        }

        function onFileChange() {
            fileUpload.file = uploadImageDialog.uploadFile;
            if (fileUpload.file) {
                if (uploadImageDialog.data.imageId) {
                    fileUpload.fileId = uploadImageDialog.data.imageId;
                    EventEmitterService.emit(UploadEvents.UPDATE_SINGLE_FILE_CONTENT, fileUpload, function(err) {
                        uploadImageDialog.isSubmitting = false;
                        uploadImageDialog.avatarLink = DownloaderService.createRawFileLink(uploadImageDialog.data.imageId) +
                            '&cb=' + (new Date()).toString();
                    });
                } else {
                    EventEmitterService.emit(UploadEvents.UPLOAD_SINGLE_FILE, fileUpload, function(err, result) {
                        uploadImageDialog.isSubmitting = false;
                        uploadImageDialog.fileId = result.fileId;
                        uploadImageDialog.data.imageId = result.fileId;
                        uploadImageDialog.avatarLink = DownloaderService.createRawFileLink(result.fileId);
                    });
                }

            }
        }

        function track(progress) {
            if (!uploadImageDialog.isSubmitting) {
                uploadImageDialog.isSubmitting = true;
            }
        }
    }

})();