(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SchoolYearSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SchoolYearSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.UPDATE_SCHOOL_YEAR, function ($event, data, callback) {
            vendors.pace.restart();
            SchoolYearSettingResourceService.updateSchoolYear(data._id, data.name, data.description, data.dateStart,
                data.dateEnd, data.updatedBy, function (err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, result);
                    }
                });
        });
    }
})();