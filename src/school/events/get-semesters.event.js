(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SemesterSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SemesterSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.GET_SEMESTERS, function($event, id, callback) {
            vendors.pace.restart();
            SemesterSettingResourceService.getSemesters(id, function(err, result) {
                if (err) {
                    callback({ err: err, schoolYearId: id });
                } else {
                    callback(undefined, {
                        schoolYearId: id,
                        result: result
                    });
                }
            });
        });
    }
})();