(function () {
    angular.module('app.user')
        .component('createUser', {
            templateUrl: 'src/user/create-user/create-user.html',
            controller: CreateUserComponent,
            controllerAs: 'createUser'
        });
    CreateUserComponent.$inject = ['$rootScope', '$state', 'EventEmitterService', 'UserEvents'];
    function CreateUserComponent($rootScope, $state, EventEmitterService, UserEvents) {
        var createUser = this;
        createUser.isLoading = false;
        createUser.save = save;
        createUser.$onDestroy = destroy;
        function save() {
            createUser.isLoading = true;
            EventEmitterService.emit(UserEvents.REGISTER, createUser.data, function (err, result) {
                if (err) {
                    createUser.errorMessage = err.data.message;
                } else {
                    $rootScope.unlocked = undefined;
                    $state.go('login');
                }
            });
        }
        function destroy() {
            createUser.isLoading = false;
            createUser.data = undefined;
            createUser.errorMessage = undefined;
        }

    }
})();