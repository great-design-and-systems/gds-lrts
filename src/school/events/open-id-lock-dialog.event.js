(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'EventEmitterService', 'AppEvents', 'SchoolEvents'];
    function Event($rootScope, EventEmitterService, AppEvents, SchoolEvents) {
        $rootScope.$on(SchoolEvents.OPEN_ID_LOCK_DIALOG, function ($event, callback) {
            var dialogData = {};
            dialogData.controller = 'SchoolIdLockDialogController';
            dialogData.controllerAs = 'schoolIdLockDialog';
            dialogData.templateUrl = 'src/school/id-lock-dialog/school-id-lock-dialog.html';

            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function (err, dialog) {
                if (err) {
                    callback(err);
                } else {
                    dialog.then(function (schoolId) {
                        callback(undefined, schoolId);
                    }, function () {
                        callback({
                            message: 'cancelled'
                        });
                    });
                }
            });
        });
    }
})();