(function () {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'StudentsEvents', 'UploadResourceService', 'AppEvents', 'EventEmitterService'];

    function Event($rootScope, StudentsEvents, UploadResourceService, AppEvents, EventEmitterService) {
        $rootScope.$on(StudentsEvents.OPEN_CREATE_STUDENT_FORM_DIALOG, function ($event, data, callback) {
            var dialogData = {
                controller: 'StudentCreateFormController',
                controllerAs: 'createForm',
                templateUrl: 'src/students/create-form-dialog/create-form-dialog.html',
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function (err, dialog) {
                if (!err) {
                    dialog.then(function (data) {
                        callback();
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