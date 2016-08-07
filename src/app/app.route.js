(function () {
    'use strict';
    angular.module('gdsApp')
        .config(AppRoute);

    AppRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function AppRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/monitor');
        $urlRouterProvider.when('/school', '/school/setting');
        $stateProvider
            .state('monitor', {
                label: 'Monitor',
                url: '/monitor',
                views: {
                    'mainFrame': {
                        template: '<monitor></monitor>'
                    },
                    'control': {
                        template: '<monitor-control></monitor-control>'
                    }
                }
            })
            .state('schoolSetting', {
                url: '/school/setting',
                label: 'School',
                legend: 'Setting',
                legendFI: 'fa fa-gear',
                views: {
                    'mainFrame': {
                        template: '<school-setting></school-setting>'
                    }
                }
            });
    }

    ExposeRouteParams.$inject = ['$stateParams'];

    function ExposeRouteParams($stateParams) {
        var exposedRoute = this;
        exposedRoute.param = $stateParams;
    }

})();