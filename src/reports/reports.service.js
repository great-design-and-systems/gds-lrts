(function() {
    'use strict';
    angular.module('app.reports')
        .service('ReportsService', ReportsService);

    function ReportsService() {
        var reports = this;
        reports.properties = {};
    }
})();