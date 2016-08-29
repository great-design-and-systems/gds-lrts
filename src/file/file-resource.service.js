(function() {
    'use strict';
    angular.module('app.file')
        .service('FileResourceService', FileResourceService);
    FileResourceService.$inject = ['$resource', 'API_HOST', 'FILE_CONTEXT'];

    function FileResourceService($resource, API_HOST, FILE_CONTEXT) {
        var resource = $resource(API_HOST + FILE_CONTEXT, {}, {
            deleteFile: {
                method: 'DELETE',
                url: API_HOST + FILE_CONTEXT + 'deleteFile?param=fileId::fileId',
                params: {
                    fileId: '@fileId'
                }
            }
        });

        return {
            deleteFile: deleteFile
        };

        function deleteFile(fileId, callback) {
            return resource.deleteFile({
                    fileId: fileId
                },
                function() { callback(); },
                function(err) {
                    console.error('file-resource.service.deleteFile', err);
                    callback(err);
                });
        }
    }
})();