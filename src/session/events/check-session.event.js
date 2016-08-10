(function() {
    'use strict';
    angular.module('app.session')
        .run(Event);
    Event.$inject = ['$rootScope', 'SessionService', 'SessionEvents'];

    function Event($rootScope, SessionService, SessionEvents) {
        $rootScope.$on(SessionEvents.CHECK_SESSION, function($event, callback) {
            if (SessionService.isActive()) {
                callback(undefined);
            } else {
                callback({
                    message: 'Inactive session'
                });
            }
        });
    }
})();