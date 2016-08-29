(function() {
    'use strict';
    angular.module('app.upload')
        .constant('UploadEvents', {
            UPLOAD_SINGLE_FILE: 'uploadSingleFile',
            UPLOAD_IMAGE_DIALOG: 'uploadImageDialog',
            UPDATE_SINGLE_FILE_CONTENT: 'updateSingleFileContent'
        });
})();