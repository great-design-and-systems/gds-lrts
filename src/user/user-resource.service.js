(function() {
    'use strict';
    angular.module('app.user')
        .service('UserResourceService', UserResourceService);
    UserResourceService.$inject = ['$resource', 'API_HOST', 'USER_CONTEXT'];

    function UserResourceService($resource, API_HOST, USER_CONTEXT) {
        var userResource = $resource(API_HOST + USER_CONTEXT + ':action');
        return {
            getUserProfile: getUserProfile
        };

        function getUserProfile(username, callback) {
            return userResource.get({
                action: 'userProfile',
                param: 'username:' + username
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }
    }
})();