(function() {
    angular.module('gdsApp')
        .run(OpenDialog);
    OpenDialog.$inject = ['$rootScope', 'AppEvents', '$mdDialog'];

    function OpenDialog($rootScope, AppEvents, $mdDialog) {
        $rootScope.$on(AppEvents.OPEN_DIALOG, function($event, data, callback) {
            var locals = data.locals;
            if (!locals) {
                locals = {};
            }
            locals.cancel = cancel;
            locals.hide = hide;

            function cancel(args) {
                $mdDialog.cancel(args);
            }

            function hide(args) {
                $mdDialog.hide(args);
            }
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
                    locals: locals,
                    bindToController: data.bindToController || true
                });
                callback(undefined, dialog);
            } catch (err) {
                callback(err);
            }
        });
    }
})();