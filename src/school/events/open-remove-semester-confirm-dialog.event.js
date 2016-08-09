(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_REMOVE_SEMESTER_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogConfirmData = {
                title: 'Do you want to remove ' + data.description + '?',
                textContent: 'This semester will be removed permanently.',
                ok: 'Yes',
                cancel: 'No, wait!',
                ariaLabel: 'Remove semester dialog',
                semesterId: data._id
            };
            callback(undefined, dialogConfirmData);
        });
    }
})();