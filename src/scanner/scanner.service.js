(function () {
    'use strict';
    angular.module('app.scanner')
        .run(ScannerService);
    ScannerService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'MonitorEvents'];
    function ScannerService(vendors, API_HOST, EventEmitterService, MonitorEvents) {
        var socket = vendors.Socket.connect(API_HOST);
        socket.on('scanned', function (info) {
            if (info && info.timeInID) {
                EventEmitterService.emit(MonitorEvents.REFRESH_TODAY_RECORDS_EVENT);
            }
        });
        console.log('Scanner has been started: ', socket);
    }

})();