(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_EDIT_SCHOOL_YEAR_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'EditSchoolYearController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/school-year-setting/school-year-form-dialog.html',
                locals: {
                    model: data
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();