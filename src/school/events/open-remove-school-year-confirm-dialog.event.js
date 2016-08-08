(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_REMOVE_SCHOOL_YEAR_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogConfirmData = {
                title: 'Do you want to remove ' + data.name + '?',
                textContent: 'This school year will be removed permanently.',
                ok: 'Yes',
                cancel: 'No, wait!',
                ariaLabel: 'Remove school year dialog',
                schoolYearId: data._id
            };
            callback(undefined, dialogConfirmData);
        });
    }
})();