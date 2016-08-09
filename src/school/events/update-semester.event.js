(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'SemesterSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, SemesterSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.UPDATE_SEMESTER, function($event, data, callback) {
            vendors.pace.restart();
            SemesterSettingResourceService.updateSemester(data._id, data.description, data.dateStart,
                data.dateEnd, data.updatedBy,
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