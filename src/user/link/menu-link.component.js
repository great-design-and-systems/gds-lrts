(function() {
    'use strict';
    angular.module('app.user')
        .component('userLink', {
            templateUrl: 'src/user/link/menu-link.html',
            controller: UserLinkComponent,
            controllerAs: 'userLink',
            bindings: {
                username: '='
            }
        });
    UserLinkComponent.$inject = ['EventEmitterService', 'UserEvents', 'SessionEvents', '$state'];

    function UserLinkComponent(EventEmitterService, UserEvents, SessionEvents, $state) {
        var userLink = this;
        userLink.isLoading = false;
        userLink.$onInit = onInit;
        userLink.onLoggedOut = onLoggedOut;
        if (!userLink.username) {
            throw 'Username is required.';
        }
        EventEmitterService.onComplete(UserEvents.GET_USER_PROFILE, function(userProfile) {
            userLink.profile = userProfile;
        });

        function onInit() {
            userLink.isLoading = true;
            EventEmitterService.emit(UserEvents.GET_USER_PROFILE, userLink.username, function() {
                userLink.isLoading = false;
            });
        }

        function onLoggedOut(err) {
            if (!err) {
                EventEmitterService.emit(SessionEvents.CHECK_SESSION, function() {
                    EventEmitterService.emit(UserEvents.GET_USERNAME, function() {
                        $state.go('login');
                    });
                });

            } //TODO: alert errors
        }
    }
})();