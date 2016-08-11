(function() {
    'use strict';
    angular.module('app.logout')
        .service('LogoutService', LogoutService);

    LogoutService.$inject = ['$cookies', 'SESSION_TOKEN', 'SESSION_USER'];

    function LogoutService($cookies, SESSION_TOKEN, SESSION_USER) {
        return {
            execute: execute
        };

        function execute() {
            $cookies.remove(SESSION_TOKEN);
            $cookies.remove(SESSION_USER);
        }
    }
})();