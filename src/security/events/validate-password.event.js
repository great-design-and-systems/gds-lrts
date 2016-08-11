(function() {
    'use strict';
    angular.module('app.security')
        .run(Event);
    Event.$inject = ['$rootScope', 'SecurityResourceService', 'SecurityEvents'];

    function Event($rootScope, SecurityResourceService, SecurityEvents) {
        $rootScope.$on(SecurityEvents.VALIDATE_PASSWORD, function($event, data, callback) {
            SecurityResourceService.validatePassword(data.password, data.currentPassword, function(err) {
                if (!err) {
                    callback();
                } else {
                    callback(err);
                }
            });
        });
    }
})();