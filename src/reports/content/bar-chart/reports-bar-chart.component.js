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
        EventEmitterService.onStart(ReportsEvents.GENERATE_REPORTS, function () {
            reportsBarChart.isLoading = true;
        });
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function (result) {
            reportsBarChart.isLoading = false;
            if (result.type === 'bar') {
                ReportsService.createBarChart(result.data);
            }
        });
        EventEmitterService.onFail(ReportsEvents.GENERATE_REPORTS, function () {
            reportsBarChart.isLoading = false;
            //TODO: alert reason when fail
        });
        function onInit() {
            reportsBarChart.isLoading = false;
        }
    }
})();