(function() {
  'use strict';
  angular.module('gdsApp')
    .config(AppTheme);

    function AppTheme($mdThemingProvider) {
	  	$mdThemingProvider.definePalette('schoolePallete',{
			'50': 'dfdfe7',
		    '100': 'b4b3c5',
		    '200': '8785a3',
		    '300': '55537d',
		    '400': '312f61',
		    '500': '0e0b46',
		    '600': '0c0a3f',
		    '700': '0b0838',
		    '800': '090731',
		    '900': '070524',
		    'A100': 'e3d6b0',
		    'A200': 'c0a34c',
		    'A400': 'a67c00',
		    'A700': '866400',
		    'contrastDefaultColor': 'light',
		    'contrastDarkColors': ['50', '100',
		     '200', '300', '400', 'A100'],
		    'contrastLightColors': undefined
		});
		$mdThemingProvider.theme('default')
			.primaryPalette('schoolePallete');
	}
})();