(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SemesterSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SemesterSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.CREATE_SEMESTER, function($event, data, callback) {
            vendors.pace.restart();
            SemesterSettingResourceService.createSemester(data.schoolYearId, data.description, data.dateStart,
                data.dateEnd, data.createdBy,
                function(err, result) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(undefined, result);
                    }
                });
        });
    }
})();