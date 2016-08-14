(function () {
    angular.module('app.reports')
        .component('reportsLineChart', {
            templateUrl: 'src/reports/content/line-chart/reports-line-chart.html',
            controller: ReportsLineChartComponent,
            controllerAs: 'reportsLineChart'
        });
    ReportsLineChartComponent.$inject = ['EventEmitterService', 'ReportsEvents', 'ReportsService'];
    function ReportsLineChartComponent(EventEmitterService, ReportsEvents, ReportsService) {
        var reportsLineChart = this;
        reportsLineChart.$onInit = onInit;
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function (result) {
            if (result.type === 'line') {
                ReportsService.createLineChart(result.data);
            }
        });
        function onInit() {
            ReportsService.destroyChart();
        }
    }
})();