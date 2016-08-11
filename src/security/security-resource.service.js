(function() {
    'use strict';
    angular.module('app.security')
        .service('SecurityResourceService', SecurityResourceService);
    SecurityResourceService.$inject = ['$resource', 'API_HOST', 'SECURITY_CONTEXT'];

    function SecurityResourceService($resource, API_HOST, SECURITY_CONTEXT) {
        var resource = $resource(API_HOST + SECURITY_CONTEXT, {}, {
            validatePassword: {
                method: 'POST',
                url: API_HOST + SECURITY_CONTEXT + 'validatePassword'
            }
        });

        return {
            validatePassword: validatePassword
        };

        function validatePassword(password, currentPassword, callback) {
            return resource.validatePassword({
                password: password,
                currentPassword: currentPassword
            }, function() {
                callback();
            }, function(err) {
                callback(err);
            });
        }

    }
})();