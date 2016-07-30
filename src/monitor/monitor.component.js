(function () {
    'use strict';
    angular.module('app.monitor')
        .component('monitor', {
            templateUrl: 'src/monitor/monitor.html',
            controller: MonitorComponent,
            controllerAs: 'monitor'
        });
    MonitorComponent.$inject = ['EventEmitterService'];
    function MonitorComponent(EventEmitterService) {
        var monitor = this;
        monitor.$onInit = onInit;
        monitor.isLoading = false;
        EventEmitterService.onComplete('refreshTodayRecords', function (entries) {
            monitor.entries = entries;
        });
        function onInit() {
            monitor.isLoading = true;
            EventEmitterService.emit('refreshTodayRecords', function () {
                monitor.isLoading = false;
            });
        }
    }
})();