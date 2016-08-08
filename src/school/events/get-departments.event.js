(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'DepartmentSettingResourceService', 'vendors'];
    function Event($rootScope, SchoolEvents, DepartmentSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.GET_DEPARTMENTS, function ($event, callback) {
            vendors.pace.restart();
            DepartmentSettingResourceService.getDepartments(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();