(function() {
    'use strict';
    angular.module('app.session')
        .directive('isSessionActive', IsSessionActive);
    IsSessionActive.$inject = ['EventEmitterService', 'SessionEvents'];

    function IsSessionActive(EventEmitterService, SessionEvents) {
        return {
            restrict: 'A',
            scope: true,
            link: function(scope, element) {
                element.css('display', 'none');
                EventEmitterService.onComplete(SessionEvents.CHECK_SESSION, function(err) {
                    if (!err) {
                        element.css('display', 'block');
                    } else {
                        element.css('display', 'none');
                    }
                });
            }
        };
    }
})();