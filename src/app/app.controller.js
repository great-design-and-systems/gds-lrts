(function() {
    'use strict';
    angular.module('gdsApp')
        .controller('GdsAppCtrl', GdsAppCtrl);

    GdsAppCtrl.$inject = ['$rootScope', 'EventEmitterService', 'SessionEvents', '$state'];

    function GdsAppCtrl($rootScope, EventEmitterService, SessionEvents, $state) {
        var gdsApp = this;
        EventEmitterService.emit(SessionEvents.CHECK_SESSION, function(err) {
            if (!err) {
                $state.go('monitor');
            } else {
                $state.go('login');
            }
        });

        $rootScope.$on('$stateChangeStart', function($event, toState) {
            if (!$rootScope.isSessionActive && toState !== 'login') {
                $event.preventDefault();
                $state.go('login');
            }
        });
    }
})();