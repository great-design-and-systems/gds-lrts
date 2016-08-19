(function () {
    angular.module('app.user')
        .component('createUser', {
            templateUrl: 'src/user/create-user/create-user.html',
            controller: CreateUserComponent,
            controllerAs: 'createUser',
            bindings: {
                schoolId: '<'
            }
        });
    function CreateUserComponent() {
        var createUser = this;
        if (!schoolId) {
            throw 'SchoolID is required';
        }
    };
})();