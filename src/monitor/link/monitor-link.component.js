(function () {
    'use strict';
    angular.module('app.monitor')
        .component('monitorLink', {
            templateUrl: 'src/monitor/link/monitor-link.html',
            controller: MonitorLinkComponent,
            controllerAs: 'monitorLink'
        });
    function MonitorLinkComponent() {
        var monitorLink = this;
    }
})();