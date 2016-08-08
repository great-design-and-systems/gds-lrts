(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'EducationLevelSettingResourceService', 'vendors'];

    function Event($rootScope, SchoolEvents, EducationLevelSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.UPDATE_EDUCATION_LEVEL, function($event, data, callback) {
            vendors.pace.restart();
            EducationLevelSettingResourceService.updateEducationLevel(data._id, data.name, data.description, data.updatedBy, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();