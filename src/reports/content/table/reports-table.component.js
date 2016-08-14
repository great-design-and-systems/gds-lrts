(function () {
    angular.module('app.reports')
        .component('reportsTable', {
            templateUrl: 'src/reports/content/table/reports-table.html',
            controller: ReportsTableComponent,
            controllerAs: 'reportsTable'
        });
    ReportsTableComponent.$inject = ['EventEmitterService', 'ReportsEvents', 'ReportsService', 'ExporterEvents', 'EntryExportLayoutService'];
    function ReportsTableComponent(EventEmitterService, ReportsEvents, ReportsService, ExporterEvents, EntryExportLayoutService) {
        var reportsTable = this;
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function (result) {
            if (result.type === 'table') {
                reportsTable.values = result.data;
                ReportsService.exportData.description = ReportsService.properties.title;
                ReportsService.exportData.limit = result.data.length;
            }
        });
        EventEmitterService.onComplete(ExporterEvents.CREATE_EXPORT_CSV, function (exportResult) {
            var addItemsCSV = {};
            addItemsCSV.exportId = exportResult.exportId;
            EntryExportLayoutService.execute(reportsTable.values, function (err, csvFormattedData) {
                if (!err) {
                    addItemsCSV.items = csvFormattedData;
                    EventEmitterService.emit(ExporterEvents.ADD_EXPORT_ITEMS_CSV, addItemsCSV);
                }
            });
        });
    }
})();