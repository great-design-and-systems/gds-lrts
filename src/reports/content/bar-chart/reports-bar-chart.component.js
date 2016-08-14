(function () {
    angular.module('app.reports')
        .component('reportsBarChart', {
            templateUrl: 'src/reports/content/bar-chart/reports-bar-chart.html',
            controller: ReportsBarChartComponent,
            controllerAs: 'reportsBarChart'
        });
    ReportsBarChartComponent.$inject = ['EventEmitterService', 'ReportsEvents', 'ReportsService'];
    function ReportsBarChartComponent(EventEmitterService, ReportsEvents, ReportsService) {
        var reportsBarChart = this;
        reportsBarChart.$onInit = onInit;
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function (result) {
            if (result.type === 'bar') {
                ReportsService.createBarChart(result.data);
            }
        });
        function onInit() {
            ReportsService.destroyChart();
        }
    }
})();