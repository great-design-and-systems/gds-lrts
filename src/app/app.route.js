(function() {
    'use strict';
    angular.module('gdsApp')
        .config(AppRoute);

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
            })
            .state('changePasword', {
                url: '/change-password',
                label: 'Change password',
                views: {
                    'mainFrame': {
                        template: '<change-password></change-password>'
                    }
                }
            })
            .state('reports', {
                url: '/reports',
                label: 'Reports',
                settingLabel: 'Properties',
                views: {
                    mainFrame: {
                        template: '<reports-content></reports-content>'
                    },
                    pageSetting: {
                        template: '<reports-settings></reports-settings>'
                    },
                    control: {
                        template: '<reports-control></reports-control>'
                    }
                },

            })
            .state('createUser', {
                url: '/user/register',
                idLocked: true,
                label: 'Register',
                views: {
                    mainFrame: {
                        template: '<create-user></create-user>',
                    }
                }
            })
            .state('students', {
                url: '/school/students',
                label: 'School',
                legend: 'Student',
                legendFI: 'fa fa-book',
                views: {
                    mainFrame: {
                        template: '<students></students>'
                    },
                    control: {
                        template: '<students-control></students-control>'
                    },
                    pageSetting: {
                        template: '<filter-settings></filter-settings>'
                    },
                }
            })
            .state('importLog', {
                url: '/import-logs/:importId',
                label: 'Import',
                legend: 'Logs',
                legendFI: 'fa fa-history',
                views: {
                    mainFrame: {
                        template: '<import-logs import-id="route.param.importId"></import-logs>',
                        controller: ExposeRouteParams,
                        controllerAs: 'route'
                    }
                }
            })
            .state('faculty', {
                url: '/school/faculty',
                label: 'School',
                legend: 'Faculty',
                legendFI: 'fa fa-book',
                views: {
                    mainFrame: {
                        template: '<faculty></faculty>'
                    },
                    control: {
                        template: '<faculty-control></faculty-control>'
                    },
                    pageSetting: {
                        template: '<faculty-filter-settings></faculty-filter-settings>'
                    },
                }
            });
    }
    ExposeRouteParams.$inject = ['$stateParams'];

    function ExposeRouteParams($stateParams) {
        var exposedRoute = this;
        exposedRoute.param = $stateParams;
    }
})();