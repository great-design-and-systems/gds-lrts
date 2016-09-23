(function () {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'FacultyEvents', 'UploadResourceService', 'AppEvents', 'EventEmitterService', 'FilterSettingsService'];

    function Event($rootScope, FacultyEvents, UploadResourceService, AppEvents, EventEmitterService, FilterSettingsService) {
        $rootScope.$on(FacultyEvents.OPEN_EDIT_FACULTY_FORM_DIALOG, function ($event, callback) {
            var dialogData = {
                controller: 'FacultyEditFormController',
                controllerAs: 'facultyForm',
                templateUrl: 'src/faculty/form-dialog/form-dialog.html',
                locals: {
                    cancelLabel: 'Cancel',
                    submitLabel: 'Save',
                    title: 'New Faculty'
                }
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function (err, dialog) {
                if (!err) {
                    dialog.then(function () {
                        EventEmitterService.emit(FacultyEvents.GET_FACULTIES, FilterSettingsService, function () {
                            callback();
                        });
                    }, function () {
                        callback();
                    });
                } else {
                    callback(err);
                    //TODO: alert technical errors
                }
            });
        });
    }
})();