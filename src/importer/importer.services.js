(function() {
    'use strict';
    angular.module('app.importer')
        .run(ImporterService);

    ImporterService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'ImporterEvents'];

    function ImporterService(vendors, API_HOST, EventEmitterService, ImporterEvents) {
        var socket = vendors.Socket.connect(API_HOST);
        socket.on(ImporterEvents.IMPORTER_PROGRESS_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT);
        });
        socket.on(ImporterEvents.IMPORTER_COMPLETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT);
            EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
        });
        socket.on(ImporterEvents.IMPORTER_DELETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
        });
        socket.on(ImporterEvents.IMPORTER_FAILED_COMPLETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_FAILED_EVENT);
        });
        console.log('Export progress listener has been started: ', socket);
    }
})();