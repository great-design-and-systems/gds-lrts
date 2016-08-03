(function () {
    'use strict';
    angular.module('app.monitor')
        .component('monitor', {
            templateUrl: 'src/monitor/monitor.html',
            controller: MonitorComponent,
            controllerAs: 'monitor'
        });
    MonitorComponent.$inject = ['EventEmitterService', 'MonitorEvents', 'ExporterEvents'];
    function MonitorComponent(EventEmitterService, MonitorEvents, ExporterEvents) {
        var monitor = this;
        monitor.$onInit = onInit;
        monitor.isLoading = false;
        EventEmitterService.onComplete(MonitorEvents.REFRESH_TODAY_RECORDS_EVENT, function (entries) {
            monitor.entries = entries;
        });
        EventEmitterService.onComplete(MonitorEvents.CREATE_TODAY_RECORDS_EXPORT_EVENT, function (exportTracker) {
            EventEmitterService.emit(ExporterEvents.CREATE_EXPORT_CSV, exportTracker);
            EventEmitterService.onComplete(ExporterEvents.CREATE_EXPORT_CSV, function (exportResult) {
                var addItemsCSV = {};
                addItemsCSV.exportId = exportResult.exportId;
                addItemsCSV.items = exportTracker.items;
                EventEmitterService.emit(ExporterEvents.ADD_EXPORT_ITEMS_CSV, addItemsCSV);
            });
        });
        function onInit() {
            monitor.isLoading = true;
            EventEmitterService.emit(MonitorEvents.REFRESH_TODAY_RECORDS_EVENT, function () {
                monitor.isLoading = false;
            });
        }
    }
})();