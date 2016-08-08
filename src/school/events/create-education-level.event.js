(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'EducationLevelSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, EducationLevelSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.CREATE_EDUCATION_LEVEL, function($event, data, callback) {
            vendors.pace.restart();
            EducationLevelSettingResourceService.createEducationLevel(data.name, data.description, data.createdBy, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();