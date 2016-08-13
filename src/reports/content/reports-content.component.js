(function() {
    angular.module('app.reports')
        .component('reportsContent', {
            templateUrl: 'src/reports/content/reports-content.html',
            controller: ReportsContentComponent,
            controllerAs: 'reportsContent'
        });
    ReportsContentComponent.$inject = ['ReportsService'];

    function ReportsContentComponent(ReportsService) {
        var reportsContent = this;
        reportsContent.reportProperties = ReportsService.properties;
    }

})();