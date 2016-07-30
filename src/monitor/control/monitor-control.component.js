(function () {
    'use strict';
    angular.module('app.monitor')
        .component('monitorControl', {
            templateUrl: 'src/monitor/control/monitor-control.html',
            controller: MonitorControlComponent,
            controllerAs: 'monitorControl'
        });
    MonitorControlComponent.$inject = ['EventEmitterService'];
    function MonitorControlComponent(EventEmitterService) {
        var monitorControl = this;
        monitorControl.emit = emit;
        function emit($event) {
            var element = angular.element($event.currentTarget);
            element.attr('disabled', '');
            EventEmitterService.emit(element.attr('id'), function () {
                element.removeAttr('disabled');
            });
        }
    }

})();