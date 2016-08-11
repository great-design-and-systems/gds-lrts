(function() {
    'use strict';
    angular.module('app.logout')
        .run(Event);
    Event.$inject = ['LogoutEvents', 'LogoutService', '$rootScope'];

    function Event(LogoutEvents, LogoutService, $rootScope) {
        $rootScope.$on(LogoutEvents.LOGOUT, function($event, callback) {
            try {
                LogoutService.execute();
                callback();
            } catch (err) {
                console.error(err);
                callback(err);
            }
        });
    }
})();