(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'DepartmentSettingResourceService', 'vendors'];
    function Event($rootScope, SchoolEvents, DepartmentSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.UPDATE_DEPARTMENT, function ($event, data, callback) {
            vendors.pace.restart();
            DepartmentSettingResourceService.updateDepartment(data._id, data.name, data.description, data.updatedBy, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();