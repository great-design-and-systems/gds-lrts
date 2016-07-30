(function () {
    'use strict';
    angular.module('app.scanner')
        .service('ScannerService', ScannerService)
        .run(RunService);
    ScannerService.$inject = ['vendors', 'EventEmitterService'];

    ScannerService.$inject = ['vendors', 'API_HOST', 'EventEmitterService'];

    function ScannerService(vendors, API_HOST, EventEmitterService) {
        return {
            startScanner: startScanner
        };

        function startScanner() {
            var socket = vendors.Socket.connect(API_HOST);
            socket.on('scanned', function (info) {
                if (info && info.timeInID) {
                    EventEmitterService.emit('refreshTodayRecords');
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