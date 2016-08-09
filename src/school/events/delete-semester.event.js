(function() {
    'use strict';
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SemesterSettingResourceService', 'SchoolEvents', 'vendors'];

    function Event($rootScope, SemesterSettingResourceService, SchoolEvents, vendors) {
        $rootScope.$on(SchoolEvents.DELETE_SEMESTER, function($event, id, callback) {
            vendors.pace.restart();
            SemesterSettingResourceService.deleteSemester(id, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();