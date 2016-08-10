(function () {
    angular.module('app.login')
        .service('LoginResourceServie', LoginResourceServie);
    LoginResourceServie.$inject = ['$resource', 'API_HOST', 'LOGIN_CONTEXT'];
    function LoginResourceServie($resource, API_HOST, LOGIN_CONTEXT) {
        var loginResource = $resource(API_HOST + LOGIN_CONTEXT);
        function login(username, password, callback) {
        }
    };
})();