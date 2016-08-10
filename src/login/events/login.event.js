(function() {
    'use strict';
    angular.module('app.login')
        .run(Event);
    Event.$inject = ['LoginEvents', 'LoginResourceService', '$rootScope'];

    function Event(LoginEvents, LoginResourceService, $rootScope) {
        $rootScope.$on(LoginEvents.LOGIN, function($event, data, callback) {
            LoginResourceService.login(data.username, data.password, callback);
        });
    }
})();