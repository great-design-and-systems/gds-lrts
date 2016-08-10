(function() {
    'use strict';
    angular.module('app.login')
        .component('login', {
            templateUrl: 'src/login/login.html',
            controller: LoginComponent,
            controllerAs: 'login'
        });

    function LoginComponent() {
        var login = this;
    }
})();