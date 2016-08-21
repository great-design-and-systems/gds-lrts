(function() {
    'use strict';
    angular.module('app.students')
        .run(Event);
    Event.$inject = ['$rootScope', 'EventEmitterService', 'FacultyEvents', 'AppEvents', 'FacultyFilterSettingsService'];

    function Event($rootScope, EventEmitterService, FacultyEvents, AppEvents, FacultyFilterSettingsService) {
        $rootScope.$on(FacultyEvents.OPEN_REMOVE_FACULTY_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogData = {
                title: 'Do you want to delete this faculty?',
                textContent: 'Faculty ' + data.lastName + ', ' + data.firstName + ' will be removed permanently.',
                ariaLabel: 'Delete faculty',
                ok: 'Yes',
                cancel: 'No, wait!'
            };
            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, dialogData, function(err, dialog) {
                dialog.then(
                    function() {
                        EventEmitterService.emit(FacultyEvents.DELETE_FACULTY, data._id, function(err) {
                            if (!err) {
                                EventEmitterService.emit(FacultyEvents.GET_FACULTIES, FacultyFilterSettingsService, function() {
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