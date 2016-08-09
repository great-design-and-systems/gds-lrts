(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_ADD_SEMESTER_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'AddSemesterController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/school-year-setting/school-year-form-dialog.html',
                locals: {
                    model: {
                        schoolYearId: data.schoolYearId,
                        description: data.description
                    }
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();