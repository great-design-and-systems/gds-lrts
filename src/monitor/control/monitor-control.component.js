(function () {
    'use strict';
    angular.module('app.monitor')
        .component('monitorControl', {
            templateUrl: 'src/monitor/control/monitor-control.html',
            controller: MonitorControlComponent,
            controllerAs: 'monitor'
        });

    function MonitorControlComponent() {

    }

})();