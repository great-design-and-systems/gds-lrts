(function () {
    angular.module('app.reports')
        .component('reportsContent', {
            templateUrl: 'src/reports/content/reports-content.html',
            controller: ReportsContentComponent,
            controllerAs: 'reportsContent'
        });

    function ReportsContentComponent() {
    }

})();