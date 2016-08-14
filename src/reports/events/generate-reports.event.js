(function () {
    'use strict';
    angular.module('app.reports')
        .run(Event);
    Event.$inject = ['$rootScope', 'ReportsService', 'ReportsEvents', 'ReportsResourceService'];
    function Event($rootScope, ReportsService, ReportsEvents, ReportsResourceService) {
        $rootScope.$on(ReportsEvents.GENERATE_REPORTS, function ($event, callback) {
            var properties = ReportsService.properties;
            if (properties.reportType === 'table') {
                ReportsResourceService.getTableTimeIns(properties.dateFrom, properties.dateTo, function (err, result) {
                    if (!err) {
                        callback(undefined, {
                            type: properties.reportType,
                            data: result.result
                        });
                    } else {
                        callback(err);
                    }
                });
            } else if (properties.reportType === 'bar') {
                ReportsResourceService.getTimeInCountByPersonType(properties.dateFrom, properties.dateTo,
                    ReportsService.getPersonType(properties), function (err, result) {
                        if (!err) {
                            callback(undefined, {
                                type: properties.reportType,
                                data: result
                            });
                        } else {
                            callback(err);
                        }
                    });
            }
        });
    }

})();