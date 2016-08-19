(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterEvents', 'EventEmitterService', 'AppEvents'];

    function Event($rootScope, ImporterEvents, EventEmitterService, AppEvents) {
        $rootScope.$on(ImporterEvents.OPEN_IMPORT_SETTING_DIALOG, function($event, data, callback) {
            var dialogData = {
                controller: 'ImportSettingDialogController',
                controllerAs: 'importSettingDialog',
                templateUrl: 'src/importer/setting-dialog/import-setting-dialog.html',
                locals: {
                    dataFor: data.dataFor
                },
                bindToController: true
            };
            EventEmitterService.emit(AppEvents.OPEN_DIALOG, dialogData, function(err, dialog) {
                if (err) {
                    console.error('open-import-setting-dialog.event', err);
                    callback(err);
                } else {
                    dialog.then(function() {
                        callback();
                    }, function() {
                        callback();
                    });
                }
            });
        });
    }
})();