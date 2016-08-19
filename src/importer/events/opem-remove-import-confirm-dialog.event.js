(function() {
    'use strict';
    angular.module('app.importer')
        .run(Event);
    Event.$inject = ['$rootScope', 'ImporterEvents', 'EventEmitterService', 'AppEvents'];

    function Event($rootScope, ImporterEvents, EventEmitterService, AppEvents) {
        $rootScope.$on(ImporterEvents.OPEN_REMOVE_IMPORT_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogData = {
                title: 'Do you want to delete this import?',
                textContent: 'Import ' + data.description + ' will be removed permanently.',
                ariaLabel: 'Delete import',
                ok: 'Yes',
                cancel: 'No, wait!'
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, dialogData, function(err, dialog) {
                if (err) {
                    console.error('open-remove-import-confirm-dialog.event', err);
                    callback(err);
                } else {
                    dialog.then(function() {
                        EventEmitterService.emit(ImporterEvents.REMOVE_IMPORT_TRACKER, {
                            importId: data._id
                        }, function(err) {
                            if (!err) {
                                EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
                                callback();
                            } else {
                                callback(err);
                                //TODO: alert for err
                            }
                        });
                    }, function() {
                        callback({
                            message: 'Cancelled'
                        });
                    });
                }
            });
        });
    }
})();