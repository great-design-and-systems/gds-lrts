(function () {
    angular.module('app.school')
        .run(CreatePurposeEvent);
    CreatePurposeEvent.$inject = ['$rootScope', 'SchoolEvents', 'PurposeSettingResourceService', 'vendors'];
    function CreatePurposeEvent($rootScope, SchoolEvents, PurposeSettingResourceService, vendors) {
        $rootScope.$on(SchoolEvents.CREATE_PURPOSE, function ($event, purpose, callback) {
            vendors.pace.restart();
            PurposeSettingResourceService.createPurpose(purpose.codeName, purpose.codeValue, purpose.createdBy, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }
})();