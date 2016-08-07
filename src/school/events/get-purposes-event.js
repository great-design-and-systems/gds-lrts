(function () {
    angular.module('app.school')
        .run(GetPurposesEvent);
    GetPurposesEvent.$inject = ['$rootScope', 'SchoolEvents', 'PurposeSettingResourceService', 'vendors'];
    function GetPurposesEvent($rootScope, SchoolEvents, PurposeSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.GET_PURPOSES, function ($event, callback) {
            vendors.pace.restart();
            PurposeSettingResourceService.getPurposes(function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();