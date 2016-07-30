(function() {
  'use strict';
  angular.module('app.core')
    .component('toolbarLogo', {
      templateUrl: 'src/app/core/toolbar-logo/toolbar-logo.html',
      controller: ToolbarLogoComponent,
      controllerAs: 'toolbarLogo'
    });

  function ToolbarLogoComponent() {

  }
})();