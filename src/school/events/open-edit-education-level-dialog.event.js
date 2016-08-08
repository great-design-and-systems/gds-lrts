(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_EDIT_EDUCATION_LEVEL_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'EditEducationLevelController',
                controllerAs: 'form',
                templateUrl: 'src/school/setting/education-level-setting/education-level-form-dialog.html',
                locals: {
                    model: data
                },
                bindToController: true
            };
            callback(undefined, dialogData);
        });
    }
})();