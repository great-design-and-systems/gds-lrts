(function () {
    angular.module('app.reports')
        .component('reportsSettings', {
            templateUrl: 'src/reports/settings/reports-settings.html',
            controller: ReportsSettingsComponent,
            controllerAs: 'reportsSettings'
        });
    function ReportsSettingsComponent() {
        var reportsSettings = this;
    }
})();