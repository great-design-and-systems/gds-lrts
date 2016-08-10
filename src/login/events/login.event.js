(function() {
    'use strict';
    angular.module('app.login')
        .run(Event);
    Event.$inject = ['LoginEvents', 'LoginResourceService', '$rootScope', '$cookies', 'SESSION_TOKEN'];

    function Event(LoginEvents, LoginResourceService, $rootScope, $cookies, SESSION_TOKEN) {
        $rootScope.$on(LoginEvents.LOGIN, function($event, data, callback) {
            LoginResourceService.login(data.username, data.password, function(err, result) {
                if (!err) {
                    $cookies.put(SESSION_TOKEN, result.sessionId);
                    callback(undefined, result);
                } else {
                    callback(err);
                }
            });
        });
    }
})();