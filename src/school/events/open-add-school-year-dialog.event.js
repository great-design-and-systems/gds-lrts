(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_ADD_SCHOOL_YEAR_DIALOG, function($event, description, callback) {
            var dialogData = {
                controller: 'AddSchoolYearController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/school-year-setting/school-year-form-dialog.html',
                locals: {
                    model: {
                        description: description
                    }
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();