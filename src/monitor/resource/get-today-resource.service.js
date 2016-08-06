(function () {
    'use strict';
    angular.module('app.monitor')
        .service('GetTodayResourceService', GetTodayResourceService);
    GetTodayResourceService.$inject = ['$resource', 'API_HOST', 'TIME_CONTEXT'];

    function GetTodayResourceService($resource, API_HOST, TIME_CONTEXT) {
        var timeResource = $resource(API_HOST + TIME_CONTEXT + ':action?param=currentTimeMilis::currentDate');
        return {
            getTodayRecords: getTodayRecords
        };
        function getTodayRecords(callback) {
            var currentDate = new Date().getTime();
            return timeResource.query({
                action: 'getTodayRecords',
                currentDate: currentDate
            }, function (result) {
                callback(undefined, result);
            }, function (err) {
                callback(err);
            });
        }
    }
})();