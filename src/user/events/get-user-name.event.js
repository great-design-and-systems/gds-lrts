(function() {
    'use strict';
    angular.module('app.user')
        .run(Event);
    Event.$inject = ['$rootScope', 'UserEvents', 'UserService'];

    function Event($rootScope, UserEvents, UserService) {
        $rootScope.$on(UserEvents.GET_USERNAME, function($event, callback) {
            $rootScope.sessionUser = UserService.getUsername();
            if ($rootScope.sessionUser) {
                callback(undefined, $rootScope.sessionUser);
            } else {
                callback({ message: 'User not found.' });
            }
        });
    }
})();