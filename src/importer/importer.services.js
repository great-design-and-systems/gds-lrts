(function() {
    'use strict';
    angular.module('app.importer')
        .run(ImporterService);

    ImporterService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'ImporterEvents', 'StudentsEvents'];

    function ImporterService(vendors, API_HOST, EventEmitterService, ImporterEvents) {
        var socket = vendors.Socket.connect(API_HOST);
        socket.on(ImporterEvents.IMPORTER_PROGRESS_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT);
        });
        socket.on(ImporterEvents.IMPORTER_COMPLETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT);
            EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
            EventEmitterService.emit(StudentsEvents.GET_STUDENTS, { page: 1, limit: 25 });
        });
        socket.on(ImporterEvents.IMPORTER_DELETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
        });
        socket.on(ImporterEvents.IMPORTER_FAILED_COMPLETED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_FAILED_EVENT);
        });
        socket.on(ImporterEvents.NEW_IMPORT_CREATED_LISTENER, function() {
            EventEmitterService.emit(ImporterEvents.GET_IN_PROGRESS_EVENT);
        });
        console.log('Import listener has been started: ', socket);
    }
})();