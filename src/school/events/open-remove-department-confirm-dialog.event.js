(function() {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents'];

    function Event($rootScope, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_REMOVE_DEPARTMENT_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogConfirmData = {
                title: 'Do you want to remove ' + data.name + '?',
                textContent: 'This department will be removed permanently.',
                ok: 'Yes',
                cancel: 'No, wait!',
                ariaLabel: 'Remove department dialog',
                departmentId: data._id
            };
            callback(undefined, dialogConfirmData);
        });
    }
})();