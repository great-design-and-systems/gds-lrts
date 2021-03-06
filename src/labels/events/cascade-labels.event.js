(function() {
    angular.module('app.labels')
        .run(Event);
    Event.$inject = ['$rootScope', 'EventEmitterService', 'LabelsEvents'];

    function Event($rootScope, EventEmitterService, LabelsEvents) {
        $rootScope.$on(LabelsEvents.CASCADE_LABELS, function($event, data, callback) {
            callback(undefined, data);
        });
        EventEmitterService.onComplete(LabelsEvents.GET_LABELS, function(result) {
            EventEmitterService.emit(LabelsEvents.CASCADE_LABELS, result);
        });
    }
})();