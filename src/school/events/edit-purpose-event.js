(function () {
    angular.module('app.school')
        .run(Event);
    Event.$inject = ['$rootScope', 'SchoolEvents', 'PurposeSettingResourceService', 'vendors'];
    function Event($rootScope, SchoolEvents, PurposeSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.EDIT_PURPOSE, function ($event, purpose, callback) {
            vendors.pace.restart();
            PurposeSettingResourceService.updatePurpose(purpose._id, purpose.codeName, purpose.codeValue, purpose.updatedBy, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();