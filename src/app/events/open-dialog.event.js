(function () {
    angular.module('gdsApp')
        .run(OpenDialog);
    OpenDialog.$inject = ['$rootScope', 'AppEvents', '$mdDialog'];
    function OpenDialog($rootScope, AppEvents, $mdDialog) {
        $rootScope.$on(AppEvents.OPEN_DIALOG, function ($event, data, callback) {
            try {
                var dialog = $mdDialog.show({
                    templateUrl: data.templateUrl,
                    controller: data.controller,
                    controllerAs: data.controllerAs,
                    template: data.template,
                    parent: angular.element(document.body),
                    targetEvent: $event,
                    clickOutsideToClose: !!data.clickOutsideToClose,
                    fullscreen: data.fullscreen,
                    locals: data.locals,
                    bindToController: data.bindToController
                });
                callback(undefined, dialog);
            } catch (err) {
                callback(err);
            }
        });
    }
})();