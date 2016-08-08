(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_EDIT_DEPARTMENT_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'EditDepartmentController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/department-setting/department-form-dialog.html',
                locals: {
                    model: data
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();