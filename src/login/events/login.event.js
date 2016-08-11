(function() {
    'use strict';
    angular.module('app.login')
        .run(Event);
    Event.$inject = ['LoginEvents', 'LoginResourceService', '$rootScope', '$cookies', 'SESSION_TOKEN', 'SESSION_USER'];

    function Event(LoginEvents, LoginResourceService, $rootScope, $cookies, SESSION_TOKEN, SESSION_USER) {
        $rootScope.$on(LoginEvents.LOGIN, function($event, data, callback) {
            LoginResourceService.login(data.username, data.password, function(err, result) {
                if (!err) {
                    $cookies.put(SESSION_TOKEN, result.sessionId);
                    $cookies.put(SESSION_USER, data.username);
                    result.username = data.username;
                    callback(undefined, result);
                } else {
                    callback(err);
                }
            });
        });
    }
})();