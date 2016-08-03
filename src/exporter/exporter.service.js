(function () {
    'use strict';
    angular.module('app.exporter')
        .service('ExporterService', ExporterService)
        .run(RunService);
    ExporterService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'ExporterEvents'];
    function ExporterService(vendors, API_HOST, EventEmitterService, ExporterEvents) {
        return {start: start};

        function start() {
            var socket = vendors.Socket.connect(API_HOST);
            socket.on(ExporterEvents.EXPORTER_PROGRESS_LISTENER, function () {
                EventEmitterService.emit(ExporterEvents.GET_IN_PROGRESS_EVENT);
            });
            socket.on(ExporterEvents.EXPORTER_COMPLETED_LISTENER, function () {
                EventEmitterService.emit(ExporterEvents.GET_IN_PROGRESS_EVENT);
                EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
            });
            console.log('Export progress listener has been started: ', socket);
        }
    }

    RunService.$inject = ['ExporterService'];
    function RunService(ExporterService) {
        ExporterService.start();
    }
})();