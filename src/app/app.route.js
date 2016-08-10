(function() {
    'use strict';
    angular.module('gdsApp')
        .config(AppRoute)
        .run(CheckSessionRoute);

    AppRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function AppRoute($stateProvider, $urlRouterProvider) {
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
            })
            .state('login', {
                url: '/login',
                label: 'Login',
                views: {
                    'mainFrame': {
                        template: '<login></login>'
                    }
                }
            });
    }

    ExposeRouteParams.$inject = ['$stateParams'];

    function ExposeRouteParams($stateParams) {
        var exposedRoute = this;
        exposedRoute.param = $stateParams;
    }

    CheckSessionRoute.$inject = ['EventEmitterService', 'SessionEvents', '$state'];

    function CheckSessionRoute(EventEmitterService, SessionEvents, $state) {
        EventEmitterService.emit(SessionEvents.CHECK_SESSION, function(err) {
            if (!err) {
                $state.go('monitor');
            } else {
                $state.go('login');
            }
        });
    }
})();