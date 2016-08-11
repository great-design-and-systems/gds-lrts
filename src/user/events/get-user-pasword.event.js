(function() {
    'use strict';
    angular.module('app.user')
        .run(Event);
    Event.$inject = ['$rootScope', 'UserEvents', 'UserResourceService'];

    function Event($rootScope, UserEvents, UserResourceService) {
        $rootScope.$on(UserEvents.GET_PASSWORD, function($event, username, callback) {
            UserResourceService.getUserPassword(username, callback);
        });
    }
})();