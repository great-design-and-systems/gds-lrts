(function() {
    'use strict';
    angular.module('app.upload')
        .service('UploadResourceService', UploadResourceService);
    UploadResourceService.$inject = ['Upload', 'API_HOST', 'FILE_CONTEXT'];

    function UploadResourceService(Upload, API_HOST, FILE_CONTEXT) {
        return {
            uploadSingleFile: uploadSingleFile
        };

        function uploadSingleFile(userId, file, track, callback) {
            Upload.upload({
                url: API_HOST + FILE_CONTEXT + 'uploadSingleFile?multipartField=uploadFile&multipart=true&param=userId:' + userId,
                data: { file: file }
            }).then(function(resp) {
                callback(undefined, {
                    fileId: resp.data.fileId,
                    message: resp.data.message
                });
            }, function(resp) {
                console.error('upload-resource.service', resp);
                callback(resp);
            }, function(evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                track(progressPercentage);
            });
        }
    }
})();