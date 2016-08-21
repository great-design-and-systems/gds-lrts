(function() {
    'use strict';
    angular.module('app.students')
        .run(Event);
    Event.$inject = ['$rootScope', 'EventEmitterService', 'StudentsEvents', 'AppEvents', 'FilterSettingsService'];

    function Event($rootScope, EventEmitterService, StudentsEvents, AppEvents, FilterSettingsService) {
        $rootScope.$on(StudentsEvents.OPEN_REMOVE_STUDENT_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogData = {
                title: 'Do you want to delete this student?',
                textContent: 'Student ' + data.lastName + ', ' + data.firstName + ' will be removed permanently.',
                ariaLabel: 'Delete student',
                ok: 'Yes',
                cancel: 'No, wait!'
            };
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, dialogData, function(err, dialog) {
                dialog.then(
                    function() {
                        EventEmitterService.emit(StudentsEvents.DELETE_STUDENT, data._id, function(err) {
                            if (!err) {
                                EventEmitterService.emit(StudentsEvents.GET_STUDENTS, FilterSettingsService, function() {
                                    callback();
                                });
                            } //TODO: alert errors
                        });
                    },
                    function() {
                        callback({
                            message: 'Cancelled'
                        });
                    });
            });
        });
    }
})();