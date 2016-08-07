(function () {
    angular.module('app.core')
        .directive('emitEvent', EmitEvent);
    EmitEvent.$inject = ['EventEmitterService'];
    function EmitEvent(EventEmitterService) {
        return {
            restrict: 'A',
            scope: {
                eventComplete: '=',
                eventData: '=',
                eventClass: '@',
                eventDebounce: '='
            },
            link: EventEventLink
        };
        function EventEventLink(scope, element, attr) {
            if (!attr.emitEvent) {
                throw 'Event name is required.';
            }
            element.unbind('click');

            element.bind('click', function () {
                if (scope.eventClass) {
                    element.toggleClass(scope.eventClass);
                }
                if (!!scope.eventDebounce) {
                    element.attr('disabled', '');
                }
                if (scope.eventData) {
                    EventEmitterService.emit(attr.emitEvent, scope.eventData, response);
                } else {
                    EventEmitterService.emit(attr.emitEvent, response);
                }
            });

            function response(err, result) {
                if (scope.eventClass) {
                    element.toggleClass(scope.eventClass);
                }
                if (scope.eventComplete) {
                    scope.eventComplete(err, result);
                }
                if (!!scope.eventDebounce) {
                    element.removeAttr('disabled');
                }
            }
        }
    }
})();