(function() {
    'use strict';
    angular.module('app.user')
        .component('changePassword', {
            templateUrl: 'src/user/change-password/change-password.html',
            controller: ChangePasswordComponent,
            controllerAs: 'changePassword'
        });
    ChangePasswordComponent.$inject = ['EventEmitterService', 'UserEvents', 'SecurityEvents', 'UserService', '$state'];

    function ChangePasswordComponent(EventEmitterService, UserEvents, SecurityEvents, UserService, $state) {
        var changePassword = this;
        changePassword.$onInit = onInit;
        changePassword.execute = execute;

        function onInit() {
            changePassword.isLoading = false;
        }

        function execute() {
            changePassword.isLoading = true;
            EventEmitterService.emit(UserEvents.GET_PASSWORD, UserService.getUsername(), function(err, resultPassword) {
                if (err) {
                    changePassword.isLoading = false;
                    changePassword.message = err.data.message;
                } else {
                    EventEmitterService.emit(SecurityEvents.VALIDATE_PASSWORD, {
                        password: changePassword.data.currentPassword,
                        currentPassword: resultPassword.password
                    }, function(err) {
                        if (err) {
                            changePassword.isLoading = false;
                            changePassword.message = err.data.message;
                        } else {
                            EventEmitterService.emit(UserEvents.CHANGE_PASSWORD, {
                                    username: UserService.getUsername(),
                                    password: changePassword.data.newPassword
                                },
                                function(err) {
                                    if (err) {
                                        changePassword.isLoading = false;
                                        changePassword.message = err.data.message;
                                    } else {
                                        $state.go('monitor');
                                        //TODO: alert for password change
                                    }
                                });
                        }
                    });
                }
            });
        }
    }
})();