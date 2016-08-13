(function() {
    'use strict';
    angular.module('app.reports')
        .service('ReportsResourceService', ReportsResourceService);
    ReportsResourceService.$inject = ['$resource', 'API_HOST', 'TIME_CONTEXT'];

    function ReportsResourceService($resource, API_HOST, TIME_CONTEXT) {

    }
})();