(function () {
    'use strict';
    angular.module('app.reports')
        .component('reportsControl', {
            templateUrl: 'src/reports/control/reports-control.html',
            controller: ReportsControlComponent,
            controllerAs: 'reportsControl'
        });
    ReportsControlComponent.$inject = ['ReportsService'];
    function ReportsControlComponent(ReportsService) {
        var reportsControl = this;
        reportsControl.reportProperties = ReportsService.properties;
        reportsControl.exportData = ReportsService.exportData;
    }
})();