(function () {
    'use strict';
    angular.module('app.core')
        .component('pageControl', {
            templateUrl: 'src/app/core/page-control/page-control.html',
            controller: PageControlComponent,
            controllerAs: 'pageControl'
        });
    PageControlComponent.$inject = ['$state'];
    function PageControlComponent($state) {
        var pageControl = this;
        pageControl.getCurrent = getCurrent;

        function getCurrent() {
            return $state.current;
        }
    }
})();