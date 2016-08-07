(function () {
    angular.module('gdsApp')
        .run(OpenDialog);
    OpenDialog.$inject = ['$rootScope', 'AppEvents', '$mdDialog'];
    function OpenDialog($rootScope, AppEvents, $mdDialog) {
        $rootScope.$on(AppEvents.OPEN_DIALOG_CONFIRM, function ($event, data, callback) {
            try {
                var confirm = $mdDialog.confirm()
                    .title(data.title)
                    .textContent(data.textContent)
                    .ariaLabel(data.ariaLabel)
                    .targetEvent($event)
                    .ok(data.ok)
                    .cancel(data.cancel);
                callback(undefined, $mdDialog.show(confirm));
            } catch (err) {
                callback(err);
            }
        });
    }
})();