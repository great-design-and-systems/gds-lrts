(function() {
    'use strict';
    angular.module('app.faculty')
        .run(Event);
    Event.$inject = ['$rootScope', 'FacultyResourceService', 'FacultyEvents'];

    function Event($rootScope, FacultyResourceService, FacultyEvents, vendors) {
        $rootScope.$on(FacultyEvents.GET_FACULTY, function($event, data, callback) {
        	vendors.pace.restart();
            FacultyResourceService.getFaculties(data.page, data.limit, data.sort, function(err, result) {
                if (!err) {
                    callback(undefined, result);
                } else {
                    callback(err);
                    //TODO: alert error
                }
            });
        });
    }
})();