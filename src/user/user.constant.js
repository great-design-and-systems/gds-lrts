(function() {
    'use strict';
    angular.module('app.user')
        .constant('UserEvents', {
            GET_USER_PROFILE: 'getUserProfile',
            GET_USERNAME: 'getUsername',
            GET_PASSWORD: 'getPassword',
            CHANGE_PASSWORD: 'changePassword'
        });
})();