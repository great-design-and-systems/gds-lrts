(function () {
    'use strict';
    angular.module('gdsApp')
        .controller('GdsAppCtrl', GdsAppCtrl);

    GdsAppCtrl.$inject = ['$rootScope', 'EventEmitterService', 'SessionEvents', '$state', 'UserEvents', 'LabelsEvents', 'LabelsService'];

    function GdsAppCtrl($rootScope, EventEmitterService, SessionEvents, $state, UserEvents, LabelsEvents, LabelsService) {
        var gdsApp = this;
        EventEmitterService.emit(SessionEvents.CHECK_SESSION, function (err) {
            if (!err) {
                $state.go('monitor');
            } else {
                $state.go('login');
            }
        });
        EventEmitterService.emit(LabelsEvents.GET_LABELS, function (err, result) {
            if (!err) {
                LabelsService.setLabels(result);
            }//TODO: alert get label errors
        });
        EventEmitterService.emit(UserEvents.GET_USERNAME);
        EventEmitterService.onComplete(SessionEvents.CHECK_SESSION, function () {
            $state.go('monitor');
        });
        EventEmitterService.onFail(SessionEvents.CHECK_SESSION, function () {
            $state.go('login');
        });
        $rootScope.$on('$stateChangeStart', function ($event, toState) {
            if (!$rootScope.isSessionActive && toState.name !== 'login') {
                $event.preventDefault();
                $state.go('login');
            } else if ($rootScope.isSessionActive && toState.name === 'login') {
                $event.preventDefault();
            }
        });
    }
})();