(function() {
    angular.module('app.reports')
        .component('reportsSettings', {
            templateUrl: 'src/reports/settings/reports-settings.html',
            controller: ReportsSettingsComponent,
            controllerAs: 'reportsSettings'
        });
    ReportsSettingsComponent.$inject = ['ReportsService'];

    function ReportsSettingsComponent(ReportsService) {
        var reportsSettings = this;
        reportsSettings.today = new Date();
        reportsSettings.reportProperties = ReportsService.properties;
    }
})();