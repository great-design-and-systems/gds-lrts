(function () {
    'use strict';
    angular.module('app.core')
        .component('pageControl', {
            templateUrl: 'src/app/core/page-control/page-control.html',
            controller: PageControlComponent,
            controllerAs: 'pageControl'
        });
    PageControlComponent.$inject = ['$rootScope'];

    function PageControlComponent($rootScope) {
        var pageControl = this;
        pageControl.getUsername = getUsername;
        function getUsername() {
            return $rootScope.sessionUser;
        }
    }
})();