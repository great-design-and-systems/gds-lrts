(function() {
    'use strict';
    angular.module('app.login')
        .component('login', {
            templateUrl: 'src/login/login.html',
            controller: LoginComponent,
            controllerAs: 'login'
        });
    LoginComponent.$inject = ['$state', 'EventEmitterService', 'LoginEvents'];

    function LoginComponent($state, EventEmitterService, LoginEvents) {
        var login = this;
        login.$onInit = onInit;
        login.execute = execute;

        function onInit() {
            login.data = {};
        }

        function execute() {
            EventEmitterService.emit(LoginEvents.LOGIN, login.data, loginResponse);
        }

        function loginResponse(err) {
            if (!err) {
                $state.go('monitor');
            } else {
                login.message = 'Invalid username or password';
            }
        }
    }
})();