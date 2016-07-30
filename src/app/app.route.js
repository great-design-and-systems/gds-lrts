(function() {
  'use strict';
  angular.module('gdsApp')
    .config(AppRoute);

  AppRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

  function AppRoute($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/monitor');

    $stateProvider
      .state('monitor', {
        url: '/monitor',
        views: {
          'mainFrame': {
            template: '<monitor></monitor>'
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