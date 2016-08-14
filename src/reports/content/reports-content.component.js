(function () {
    angular.module('app.reports')
        .component('reportsContent', {
            templateUrl: 'src/reports/content/reports-content.html',
            controller: ReportsContentComponent,
            controllerAs: 'reportsContent'
        });
    ReportsContentComponent.$inject = ['ReportsService', 'EventEmitterService', 'ReportsEvents'];

    function ReportsContentComponent(ReportsService, EventEmitterService, ReportsEvents) {
        var reportsContent = this;
        reportsContent.reportProperties = ReportsService.properties;
        reportsContent.service = ReportsService;
        reportsContent.$onDestroy = onDestroy;
        EventEmitterService.onStart(ReportsEvents.GENERATE_REPORTS, function () {
            ReportsService.isLoading = true;
        });
        EventEmitterService.onComplete(ReportsEvents.GENERATE_REPORTS, function () {
            ReportsService.isLoading = false;
        });
        EventEmitterService.onFail(ReportsEvents.GENERATE_REPORTS, function () {
            ReportsService.isLoading = false;
        });
        return reportsContent;
        function onDestroy() {
            ReportsService.destroyChart();
        }
    }

})();