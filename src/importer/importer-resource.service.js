(function() {
    'use strict';
    angular.module('app.importer')
        .service('ImporterResourceService', ImporterResourceService);
    ImporterResourceService.$inject = ['$resource', 'API_HOST', 'IMPORT_CONTEXT'];

    function ImporterResourceService($resource, API_HOST, IMPORT_CONTEXT) {
        var resource = $resource(API_HOST + IMPORT_CONTEXT + ':action', {}, {
            getImportLogs: {
                method: 'GET',
                isArray: true,
                url: API_HOST + IMPORT_CONTEXT + 'getImportLogs?param=importId::importId'
            },
            createImportCSV: {
                method: 'POST',
                url: API_HOST + IMPORT_CONTEXT + 'createImportCSV'
            },
            runImportCsv: {
                method: 'PUT',
                url: API_HOST + IMPORT_CONTEXT + 'runImportCsv?$event=$newImportCreated'
            },
            removeImportTracker: {
                method: 'DELETE',
                url: API_HOST + IMPORT_CONTEXT + 'removeImportTracker?$event=importer-deleted&param=importId::importId',
                params: {
                    importId: '@importId'
                }
            }
        });
        return {
            getImportCompleted: getImportCompleted,
            getImportProgress: getImportProgress,
            getImportFailed: getImportFailed,
            getImportLogs: getImportLogs,
            createImportCSV: createImportCSV,
            runImportCsv: runImportCsv,
            removeImportTracker: removeImportTracker
        };

        function getImportCompleted(callback) {
            return resource.query({
                action: 'getImportCompleted'
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.getImportCompleted', err);
                callback(undefined, []);
            });
        }

        function getImportProgress(callback) {
            return resource.query({
                action: 'getImportProgress'
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.getImportProgress', err);
                callback(undefined, []);
            });
        }

        function getImportFailed(callback) {
            return resource.query({
                action: 'getImportFailed'
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.getImportFailed', err);
                callback(undefined, []);
            });
        }

        function getImportLogs(importId, callback) {
            return resource.getImportLogs({
                importId: importId
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.getImportLogs', err);
                callback(undefined, []);
            });
        }

        function createImportCSV(description, fileId, dataFor, callback) {
            return resource.createImportCSV({
                description: description,
                fileId: fileId,
                dataFor: dataFor
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.createImportCSV', err);
                callback(err);
            });
        }

        function runImportCsv(importId, callback) {
            return resource.runImportCsv({
                importId: importId
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                console.error('import-resource.service.runImportCsv', err);
                callback(err);
            });
        }

        function removeImportTracker(importId, callback) {
            return resource.removeImportTracker({
                importId: importId
            }, function() {
                callback();
            }, function(err) {
                console.error('import-resource.service.removeImportTracker', err);
                callback({
                    message: err.message
                });
            });
        }
    }
})();