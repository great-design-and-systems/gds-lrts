(function() {
    angular.module('app.login')
        .service('LoginResourceService', LoginResourceService);
    LoginResourceService.$inject = ['$resource', 'API_HOST', 'LOGIN_CONTEXT'];

    function LoginResourceService($resource, API_HOST, LOGIN_CONTEXT) {
        var loginResource = $resource(API_HOST + LOGIN_CONTEXT);
        return {
            login: login
        };

        function login(username, password, callback) {
            loginResource.save({
                username: username,
                password: password
            }, function(result) {
                callback(undefined, result);
            }, function(err) {
                callback(err);
            });
        }
    }
})();