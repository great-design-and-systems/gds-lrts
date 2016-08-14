(function () {
    angular.module('app.reports')
        .component('reportsTable', {
            templateUrl: 'src/reports/content/table/reports-table.html',
            controller: ReportsTableComponent,
            controllerAs: 'reportsTable'
        });
    ReportsTableComponent.$inject = ['EventEmitterService', 'ReportsEvents'];
    function ReportsTableComponent(EventEmitterService, ReportsEvents) {
        var reportsTable = this;
        reportsTable.$onInit = onInit;
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function (result) {
            reportsTable.isLoading = false;
            if (result.type === 'table') {
                reportsTable.values = result.data;
            }
        });
        EventEmitterService.onFail(ReportsEvents.GENERATE_REPORTS, function (err) {
            reportsTable.isLoading = false;//TODO: create an alert service
        });
        EventEmitterService.onStart(ReportsEvents.GENERATE_REPORTS, function () {
            reportsTable.isLoading = true;
        });
        function onInit() {
            reportsTable.isLoading = false;
        }
    }
})();