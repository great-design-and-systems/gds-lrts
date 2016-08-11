(function() {
    'use strict';
    angular.module('app.core')
        .component('pageControl', {
            templateUrl: 'src/app/core/page-control/page-control.html',
            controller: PageControlComponent,
            controllerAs: 'pageControl'
        });
    PageControlComponent.$inject = ['$state', '$rootScope'];

    function PageControlComponent($state, $rootScope) {
        var pageControl = this;
        pageControl.getCurrent = getCurrent;
        pageControl.getUsername = getUsername;

        function getCurrent() {
            return $state.current;
        }

        function getUsername() {
            return $rootScope.sessionUser;
        }
    }
})();