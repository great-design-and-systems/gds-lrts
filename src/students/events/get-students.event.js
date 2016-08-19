(function() {
    'use strict';
    angular.module('app.students')
        .run(Event);
    Event.$inject = ['$rootScope', 'StudentsResourceService', 'StudentsEvents', 'vendors'];

    function Event($rootScope, StudentsResourceService, StudentsEvents, vendors) {
        $rootScope.$on(StudentsEvents.GET_STUDENTS, function($event, data, callback) {
        	vendors.pace.restart();
            StudentsResourceService.getStudents(data.page, data.limit, data.sort, function(err, result) {
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