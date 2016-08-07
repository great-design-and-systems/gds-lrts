(function () {
    angular.module('app.school')
        .run(CreatePurposeEvent);
    CreatePurposeEvent.$inject = ['$rootScope', 'SchoolEvents', 'PurposeSettingResourceService', 'vendors'];
    function CreatePurposeEvent($rootScope, SchoolEvents, PurposeSettingResourceService, vendors) {
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