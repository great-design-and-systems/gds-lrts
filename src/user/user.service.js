(function() {
    'use strict';
    angular.module('app.user')
        .service('UserService', UserService);
    UserService.$inject = ['$cookies', 'SESSION_USER'];

    function UserService($cookies, SESSION_USER) {
        return {
            getUsername: getUsername
        };

        function getUsername() {
            return $cookies.get(SESSION_USER);
        }
    }
})();