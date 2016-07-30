(function() {
  'use strict';
  angular.module('gdsApp')
    .config(AppTheme);

    function AppTheme($mdThemingProvider) {
	  	$mdThemingProvider.theme('default')
	    .primaryPalette('brown')	
	    .accentPalette('blue');
	}
})();