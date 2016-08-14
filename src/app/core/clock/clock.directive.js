(function() {
  'use strict';
  angular.module('app.core')
    .directive('clock', AppClock);
  AppClock.$inject = ['vendors'];

  function AppClock(vendors) {
    return {
      restrict: 'E',
      templateUrl: 'src/app/core/clock/clock.html'
    };
  }
})();