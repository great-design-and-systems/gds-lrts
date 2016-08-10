(function() {
    'use strict';
    angular.module('app.session')
        .service('SessionService', SessionService);
    SessionService.$inject = ['$cookies', 'SESSION_TOKEN'];

    function SessionService($cookies, SESSION_TOKEN) {
        return {
            isActive: isActive
        };

        function isActive() {
            return !!$cookies.get(SESSION_TOKEN);
        }
    }
})();