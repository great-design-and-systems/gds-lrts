(function () {
    'use strict';
    angular.module('gdsApp')
        .directive('autoHeight', AutoHeight);
    AutoHeight.$inject = ['$window'];
    function AutoHeight($window) {
        return {
            restrict: 'A',
            link: function (scope, element, attr) {
                var w = angular.element($window);
                w.bind('resize', setElementHeight);
                function setElementHeight() {
                    var height = w.height();
                    if (attr.offset) {
                        height -= attr.offset;
                    }
                    element.height(height);
                }
                setTimeout(setElementHeight, 0);
            }
        };
    }
})();