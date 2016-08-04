(function () {
    'use strict';
    angular.module('app.exporter')
        .service('ExporterResourceService', ExporterResourceService);
    ExporterResourceService.$inject = ['$resource', 'API_HOST', 'EXPORT_CONTEXT'];

    function ExporterResourceService($resource, API_HOST, EXPORT_CONTEXT) {
        var exportResource = $resource(API_HOST + EXPORT_CONTEXT + ':action/:param', {}, {
            addExportItemsCSV: {
                method: 'PUT'
            },
            createExportCSV: {
                method: 'POST',
                url: API_HOST + EXPORT_CONTEXT + 'create-export-csv'
            }
        });
        return {
            getExportInProgress: getExportInProgress,
            getExportCompleted: getExportCompleted,
            createExportCSV: createExportCSV,
            addExportItemsCSV: addExportItemsCSV,
            removeExportTrackerById: removeExportTrackerById
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

        function getExportCompleted(callback) {
            return exportResource.query({
                action: 'get-export-completed'
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                console.error('export-resource.service', err);
                callback(err);
            });
        }

        function createExportCSV(description, limit, callback) {
            exportResource.createExportCSV({
                description: description,
                limit: limit
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                console.error('export-resource.service', err);
                callback(err);
            });
        }

        function addExportItemsCSV(exportId, items, callback) {
            return exportResource.addExportItemsCSV({
                action: 'add-export-items-csv',
                param: exportId
            }, items, function (data) {
                callback(undefined, data);
            }, function (err) {
                callback(err);
            });
        }

        function removeExportTrackerById(exportId, callback) {
            return exportResource.remove({
                action: exportId
            }, function (data) {
                callback(undefined, data);
            }, function (err) {
                callback(err);
            })
        }
    }
})();