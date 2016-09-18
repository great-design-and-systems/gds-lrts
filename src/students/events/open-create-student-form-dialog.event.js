(function () {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'StudentsEvents', 'UploadResourceService', 'AppEvents', 'EventEmitterService', 'FilterSettingsService'];

    function Event($rootScope, StudentsEvents, UploadResourceService, AppEvents, EventEmitterService, FilterSettingsService) {
        $rootScope.$on(StudentsEvents.OPEN_CREATE_STUDENT_FORM_DIALOG, function ($event, callback) {
            var dialogData = {
                controller: 'StudentCreateFormController',
                controllerAs: 'createForm',
                templateUrl: 'src/students/create-form-dialog/create-form-dialog.html',
                locals: {
                    cancelLabel: 'Cancel',
                    submitLabel: 'Save',
                    title: 'New student'
                }
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function (err, dialog) {
                if (!err) {
                    dialog.then(function () {
                        EventEmitterService.emit(StudentsEvents.GET_STUDENTS, FilterSettingsService, function () {
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