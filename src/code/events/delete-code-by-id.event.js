(function () {
    'use strict';
    angular.module('app.code')
        .run(DeleteCodeByIdEvent);
    DeleteCodeByIdEvent.$inject = ['$rootScope', 'CodeResourceService', 'CodeEvents', 'vendors'];

    function DeleteCodeByIdEvent($rootScope, CodeResourceService, CodeEvents, vendors) {
        $rootScope.$on(CodeEvents.DELETE_CODE, function ($event, codeId, callback) {
            vendors.pace.restart();
            CodeResourceService.deleteCode(codeId, function (err, result) {
                if (err) {
                    callback(err);
                } else {
                    callback(undefined, result);
                }
            });
        });
    }

})();