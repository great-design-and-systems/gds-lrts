(function() {
    'use strict';
    angular.module('app.downloader')
        .constant('DOWNLOAD_LINK', 'downloadFile?isFile=true&param=fileId:')
        .constant('READ_LINK', 'readFile?isFile=true&param=fileId:');
})();