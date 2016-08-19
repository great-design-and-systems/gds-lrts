(function() {
    'use strict';
    angular.module('app.exporter')
        .run(Event);
    Event.$inject = ['$rootScope', 'ExporterEvents', 'EventEmitterService', 'AppEvents'];

    function Event($rootScope, ExporterEvents, EventEmitterService, AppEvents) {
        $rootScope.$on(ExporterEvents.OPEN_REMOVE_EXPORT_CONFIRM_DIALOG, function($event, data, callback) {
            var dialogData = {
                title: 'Do you want to delete this export?',
                textContent: 'Export ' + data.description + ' will be removed permanently.',
                ariaLabel: 'Delete export',
                ok: 'Yes',
                cancel: 'No, wait!'
            };

            EventEmitterService.emit(AppEvents.OPEN_DIALOG_CONFIRM, dialogData, function(err, dialog) {
                if (err) {
                    console.error('open-remove-export-confirm-dialog.event', err);
                    callback(err);
                } else {
                    dialog.then(function() {
                        EventEmitterService.emit(ExporterEvents.REMOVE_EXPORT_ITEM, {
                            exportId: data._id
                        }, function(err) {
                            if (!err) {
                                EventEmitterService.emit(ExporterEvents.GET_COMPLETED_EVENT);
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