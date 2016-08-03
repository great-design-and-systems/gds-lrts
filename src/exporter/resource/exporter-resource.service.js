(function () {
    'use strict';
    angular.module('app.exporter')
        .service('ExporterResourceService', ExporterResourceService);
    ExporterResourceService.$inject = ['$resource', 'API_HOST', 'EXPORT_CONTEXT'];

    function ExporterResourceService($resource, API_HOST, EXPORT_CONTEXT) {
        var exportResource = $resource(API_HOST + EXPORT_CONTEXT + ':action/:param');
        return {
            getExportInProgress: getExportInProgress,
            createExportCSV: createExportCSV
        };

        function getExportInProgress(callback) {
            return exportResource.query({
                action: 'get-export-inprogress'
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                console.error('export-resource.service', err);
                callback(err);
            });
        }

        function createExportCSV(description, limit, callback) {
            exportResource.save({
                action: 'create-export-csv',
                description: description,
                limit: limit
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                console.error('export-resource.service', err);
                callback(err);
            });
        }
    }
})();