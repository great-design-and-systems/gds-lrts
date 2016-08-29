(function() {
    'use strict';
    angular.module('app.core')
        .directive('imageLoad', ImageLoadDirective);

    function ImageLoadDirective() {
        return {
            restrict: 'A',
            link: function(scope, element, attr) {
                var load = attr.onLoad;
                var onError = attr.onError;
                element.bind('load', function() {
                    if (load) {
                        scope.$eval(load);
                    }
                });
                element.bind('error', function() {
                    if (onError) {
                        scope.$eval(onError);
                    }
                });
            }
        };
    }
})();