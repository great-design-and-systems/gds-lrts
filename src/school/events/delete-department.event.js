(function() {
    'use strict';
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'DepartmentSettingResourceService', 'SchoolEvents', 'vendors'];

    function Event($rootScope, DepartmentSettingResourceService, SchoolEvents, vendors) {
        $rootScope.$on(SchoolEvents.DELETE_DEPARTMENT, function($event, id, callback) {
            vendors.pace.restart();
            DepartmentSettingResourceService.deleteDepartment(id, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();