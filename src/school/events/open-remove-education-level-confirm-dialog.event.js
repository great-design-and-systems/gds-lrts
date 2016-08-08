(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_REMOVE_EDUCATION_LEVEL_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogConfirmData = {
                title: 'Do you want to remove ' + data.name + '?',
                textContent: 'This education level will be removed permanently.',
                ok: 'Yes',
                cancel: 'No, wait!',
                ariaLabel: 'Remove education level dialog',
                educationLevelId: data._id
            };
            callback(undefined, dialogConfirmData);
        });
    }
})();