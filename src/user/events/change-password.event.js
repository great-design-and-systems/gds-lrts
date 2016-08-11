(function() {
    'use strict';
    angular.module('app.user')
        .run(Event);
    Event.$inject = ['$rootScope', 'UserEvents', 'UserResourceService'];

    function Event($rootScope, UserEvents, UserResourceService) {
        $rootScope.$on(UserEvents.CHANGE_PASSWORD, function($event, data, callback) {
            UserResourceService.changePassword(data.username, data.password, callback);
        });
    }
})();