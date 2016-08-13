(function () {
    angular.module('app.labels')
        .run(Event);
    Event.$inject = ['$rootScope', 'LabelsResourceService', 'LabelsEvents'];
    function Event($rootScope, LabelsResourceService, LabelsEvents) {
        $rootScope.$on(LabelsEvents.GET_LABELS, function ($event, callback) {
            LabelsResourceService.getLabels(function (err, result) {
                if (!err) {
                    callback(undefined, result);
                } else {
                    callback(err);
                }
            });
        });
    }
})();