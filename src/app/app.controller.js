(function () {
    'use strict';
    angular.module('gdsApp')
        .controller('GdsAppCtrl', GdsAppCtrl);

    GdsAppCtrl.$inject = ['$rootScope', 'EventEmitterService', 'SessionEvents',
        '$state', 'UserEvents', 'SchoolEvents'];

    function GdsAppCtrl($rootScope, EventEmitterService, SessionEvents, $state, UserEvents, SchoolEvents) {
        EventEmitterService.emit(SessionEvents.CHECK_SESSION, function (err) {
            if (!err) {
                $state.go('monitor');
            } else {
                $state.go('login');
            }
        });
        EventEmitterService.emit(UserEvents.GET_USERNAME);
        EventEmitterService.onComplete(SessionEvents.CHECK_SESSION, function () {
            $state.go('monitor');
        });
        EventEmitterService.onFail(SessionEvents.CHECK_SESSION, function () {
            $state.go('login');
        });
        $rootScope.$on('$stateChangeStart', function ($event, toState) {
            console.log('stateChangeStart', toState);
            if (!$rootScope.isSessionActive && (toState.name !== 'login' && !toState.idLocked)) {
                $event.preventDefault();
                $state.go('login');
            }
            else if (toState.idLocked) {
                if ($rootScope.unlocked !== toState.name) {
                    $event.preventDefault();
                    EventEmitterService.emit(SchoolEvents.OPEN_ID_LOCK_DIALOG, function (err, schoolId) {
                        if (!err) {
                            $rootScope.unlocked = toState.name;
                            $state.go(toState.name, {schoolId: schoolId});
                        }
                    });
                }
            }
            else if ($rootScope.isSessionActive && toState.name === 'login') {
                $event.preventDefault();
            }
        });
    }
})();