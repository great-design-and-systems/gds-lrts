(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_EDIT_SEMESTER_DIALOG, function($event, data, callback) {
            data.dateStart = new Date(data.dateStart);
            data.dateEnd = new Date(data.dateEnd);
            var dialogData = {
                controller: 'EditSemesterController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/semester-setting/semester-form-dialog.html',
                locals: {
                    model: data
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();