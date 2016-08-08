(function() {
    'use strict';
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'EducationLevelSettingResourceService', 'SchoolEvents', 'vendors'];

    function Event($rootScope, EducationLevelSettingResourceService, SchoolEvents, vendors) {
        $rootScope.$on(SchoolEvents.DELETE_EDUCATION_LEVEL, function($event, id, callback) {
            vendors.pace.restart();
            EducationLevelSettingResourceService.deleteEducationLevel(id, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();