(function () {
    'use strict';
    angular.module('app.exporter')
        .run(ExporterService);
    ExporterService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'ExporterEvents'];
    function ExporterService(vendors, API_HOST, EventEmitterService, ExporterEvents) {
        var socket = vendors.Socket.connect(API_HOST);
        socket.on(ExporterEvents.EXPORTER_PROGRESS_LISTENER, function () {
            EventEmitterService.emit(ExporterEvents.GET_IN_PROGRESS_EVENT);
        });
        socket.on(ExporterEvents.EXPORTER_COMPLETED_LISTENER, function () {
            EventEmitterService.emit(ExporterEvents.GET_IN_PROGRESS_EVENT);
            EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
        });
        socket.on(ExporterEvents.EXPORTER_DELETED_LISTENER, function () {
            EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
        });
        socket.on(ExporterEvents.EXPORTER_FAILED_COMPLETED_LISTENER, function () {
            EventEmitterService.emit(ExporterEvents.GET_FAILED_EVENT);
        });
        console.log('Export progress listener has been started: ', socket);
    }
})();