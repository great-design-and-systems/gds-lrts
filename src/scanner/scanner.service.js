(function () {
    'use strict';
    angular.module('app.scanner')
        .service('ScannerService', ScannerService)
        .run(RunService);

    ScannerService.$inject = ['vendors', 'API_HOST', 'EventEmitterService', 'MonitorEvents'];
    function ScannerService(vendors, API_HOST, EventEmitterService, MonitorEvents) {
        return {
            startScanner: startScanner
        };

        function startScanner() {
            var socket = vendors.Socket.connect(API_HOST);
            socket.on('scanned', function (info) {
                if (info && info.timeInID) {
                    EventEmitterService.emit(MonitorEvents.REFRESH_TODAY_RECORDS_EVENT);
                }
            });
            console.log('Scanner has been started: ', socket);
        }
    }

    RunService.$inject = ['ScannerService'];
    function RunService(ScannerService) {
        ScannerService.startScanner();
    }
})();