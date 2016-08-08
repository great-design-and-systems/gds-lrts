(function() {
    'use strict';
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolYearSettingResourceService', 'SchoolEvents', 'vendors'];

    function Event($rootScope, SchoolYearSettingResourceService, SchoolEvents, vendors) {
        $rootScope.$on(SchoolEvents.DELETE_SCHOOL_YEAR, function($event, id, callback) {
            vendors.pace.restart();
            SchoolYearSettingResourceService.deleteSchoolYear(id, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();