(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'DepartmentSettingResourceService', 'vendors'];
    function Event($rootScope, SchoolEvents, DepartmentSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.CREATE_DEPARTMENT, function ($event, data, callback) {
            vendors.pace.restart();
            DepartmentSettingResourceService.createDepartment(data.name, data.description, data.createdBy, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();