(function () {
    'use strict';
    angular.module('app.reports')
        .service('ReportsResourceService', ReportsResourceService);
    ReportsResourceService.$inject = ['$resource', 'API_HOST', 'TIME_CONTEXT', 'vendors'];

    function ReportsResourceService($resource, API_HOST, TIME_CONTEXT, vendors) {
        var resource = $resource(API_HOST + TIME_CONTEXT, {}, {
            getTimeIn: {
                method: 'GET',
                url: API_HOST + TIME_CONTEXT + 'getTimeIn?param=dateFrom::dateFrom&param=dateTo::dateTo',
                array: true
            },
            getTimeInCountByPersonType: {
                method: 'GET',
                url: API_HOST + TIME_CONTEXT + 'getTimeInCountByPersonType?param=dateFrom::dateFrom&param=dateTo::dateTo'
            },
            getTimeInCountByTime: {
                method: 'GET',
                url: API_HOST + TIME_CONTEXT + 'getTimeInCountByTime?param=dateFrom::dateFrom&param=dateTo::dateTo'

            }
        });
        return {
            getTableTimeIns: getTableTimeIns,
            getTimeInCountByPersonType: getTimeInCountByPersonType,
            getTimeInCountByTime: getTimeInCountByTime
        };
        function getTableTimeIns(dateFrom, dataTo, personType, callback) {
            return resource.getTimeIn({
                dateFrom: vendors.moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: vendors.moment(dataTo).format('YYYY-MM-DD'),
                personType: personType
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function getTimeInCountByPersonType(dateFrom, dateTo, personType, callback) {
            return resource.getTimeInCountByPersonType({
                dateFrom: vendors.moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: vendors.moment(dateTo).format('YYYY-MM-DD'),
                personType: personType
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }

        function getTimeInCountByTime(dateFrom, dateTo, personType, callback) {
            return resource.getTimeInCountByTime({
                dateFrom: vendors.moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: vendors.moment(dateTo).format('YYYY-MM-DD'),
                personType: personType
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();