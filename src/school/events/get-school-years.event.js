(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SchoolYearSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SchoolYearSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.GET_SCHOOL_YEARS, function($event, callback) {
            vendors.pace.restart();
            SchoolYearSettingResourceService.getSchoolYears(function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();