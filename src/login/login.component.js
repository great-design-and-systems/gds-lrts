(function() {
    'use strict';
    angular.module('app.login')
        .component('login', {
            templateUrl: 'src/login/login.html',
            controller: LoginComponent,
            controllerAs: 'login'
        });
    LoginComponent.$inject = ['$state', 'EventEmitterService', 'LoginEvents', 'SessionEvents', 'UserEvents', 'vendors'];

    function LoginComponent($state, EventEmitterService, LoginEvents, SessionEvents, UserEvents, vendors) {
        var login = this;
        login.$onInit = onInit;
        login.execute = execute;

        vendors.jQuery('login').parent().parent().css('box-shadow', 'none');
        vendors.jQuery('login').parent().css('background', 'none');

        function onInit() {
            login.data = {};
        }

        function execute() {
            login.isLoading = true;
            EventEmitterService.emit(LoginEvents.LOGIN, login.data, loginResponse);
        }

        function loginResponse(err) {
            login.isLoading = false;
            if (!err) {
                EventEmitterService.emit(SessionEvents.CHECK_SESSION);
                EventEmitterService.emit(UserEvents.GET_USERNAME);
            } else {
                login.message = 'Invalid username or password';
            }
        }
    }
})();