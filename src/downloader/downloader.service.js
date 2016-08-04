(function () {
    'use strict';
    angular.module('app.downloader')
        .service('DownloaderService', DownloaderService);
    DownloaderService.$inject = ['API_HOST', 'FILE_CONTEXT', 'DOWNLOAD_LINK'];
    function DownloaderService(API_HOST, FILE_CONTEXT, DOWNLOAD_LINK) {
        return {
            createDownloadLink: createDownloadLink
        };
        function createDownloadLink(fileId) {
            return API_HOST + FILE_CONTEXT + DOWNLOAD_LINK + fileId;
        }
    }
})();