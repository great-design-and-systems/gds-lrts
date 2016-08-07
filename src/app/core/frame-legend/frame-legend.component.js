(function () {
    'use strict';
    angular.module('app.core')
        .component('frameLegend', {
            templateUrl: 'src/app/core/frame-legend/frame-legend.html',
            controller: FrameLegendComponent,
            controllerAs: 'frameLegend'
        });
    FrameLegendComponent.$inject = ['$state'];
    function FrameLegendComponent($state) {
        var frameLegend = this;
        frameLegend.getIcon = getIcon;
        frameLegend.getLegend = getLegend;

        function getIcon() {
            return $state.current.legendFI;
        }

        function getLegend() {
            return $state.current.legend;
        }
    }
})();