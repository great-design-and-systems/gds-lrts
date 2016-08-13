(function () {
    'use strict';
    angular.module('app.core')
        .component('mainFrame', {
            templateUrl: 'src/app/core/main-frame/main-frame.html',
            controller: MainFrameComponent,
            controllerAs: 'mainFrame'
        });
    MainFrameComponent.$inject = ['$state'];
    function MainFrameComponent($state) {
        var mainFrame = this;
        mainFrame.getCurrent = getCurrent;
        function getCurrent() {
            return $state.current;
        }
    }
})();