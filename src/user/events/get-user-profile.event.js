(function() {
    'use strict';
    angular.module('app.user')
        .run(Event);
    Event.$inject = ['$rootScope', 'UserEvents', 'UserResourceService'];

    function Event($rootScope, UserEvents, UserResourceService) {
        $rootScope.$on(UserEvents.GET_USER_PROFILE, function($event, username, callback) {
            UserResourceService.getUserProfile(username, function(err, result) {
                if (!err) {
                    callback(undefined, result);
                } else {
                    callback(err);
                }
            });
        });
    }
})();