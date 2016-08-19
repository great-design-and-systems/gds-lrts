(function () {
    'use strict';
    angular.module('app.user')
        .run(Event);
    Event.$inject = ['$rootScope', 'UserEvents', 'UserResourceService'];

    function Event($rootScope, UserEvents, UserResourceService) {
        $rootScope.$on(UserEvents.REGISTER, function ($event, data, callback) {
            UserResourceService.register(data.username, data.email, data.password, data.firstname, data.lastname, callback);
        });
    }
})();