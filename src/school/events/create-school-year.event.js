(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SchoolYearSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SchoolYearSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.CREATE_SCHOOL_YEAR, function($event, data, callback) {
            vendors.pace.restart();
            SchoolYearSettingResourceService.createSchoolYear(data.name, data.description, data.dateStart, data.dateEnd, data.createdBy, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();