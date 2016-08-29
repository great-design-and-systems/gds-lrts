(function() {
    'use strict';
    angular.module('app.upload')
        .run(Event);
    Event.$inject = ['$rootScope', 'UploadEvents', 'UploadResourceService', 'AppEvents', 'EventEmitterService'];

    function Event($rootScope, UploadEvents, UploadResourceService, AppEvents, EventEmitterService) {
        $rootScope.$on(UploadEvents.UPLOAD_IMAGE_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'UploadImageDialogController',
                controllerAs: 'uploadImageDialog',
                templateUrl: 'src/upload/image-dialog/upload-image-dialog.html',
                locals: {
                    data: data
                }
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, dialog) {
                if (!err) {
                    dialog.then(function() {
                        callback();
                    }, function() {
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