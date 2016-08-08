(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'EducationLevelSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, EducationLevelSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.GET_EDUCATION_LEVELS, function($event, callback) {
            vendors.pace.restart();
            EducationLevelSettingResourceService.getEducationLevels(function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();