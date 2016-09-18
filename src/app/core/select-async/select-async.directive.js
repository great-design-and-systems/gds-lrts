(function () {
    'use strict';
    angular.module('app.core')
        .directive('selectAsync', SelectAsync);
    SelectAsync.$inject = ['EventEmitterService'];
    function SelectAsync(EventEmitterService) {
        return {
            require: 'ngModel',
            scope: {
                event: '@',
                title: '@'
            },
            restrict: 'E',
            compile: function () {
                return {
                    pre: function (scope, element, attr) {
                        if (attr.required) {
                            scope.required = true;
                        }
                    },
                    post: SelectAsyncLink
                };
            },
            templateUrl: 'src/app/core/select-async/select-async.html'
        };
        function SelectAsyncLink(scope, element, attr, ngModel) {
            var selectAsync = {};
            selectAsync.onChange = onChange;
            scope.selectAsync = selectAsync;
            scope.$on('$destroy', destroy);
            onInit();
            function onInit() {
                ngModel.$render = $render;
                selectAsync.isLoading = true;
                EventEmitterService.emit(scope.event, function (err, result) {
                    selectAsync.isLoading = false;
                    if (!err) {
                        selectAsync.asyncs = result;
                    }//TODO: alert errors
                });
            }

            function destroy() {
                selectAsync.isLoading = false;
                selectAsync.asyncs = undefined;
                selectAsync.async = undefined;
            }

            function onChange() {
                ngModel.$setViewValue(selectAsync.async);
            }

            function $render() {
                selectAsync.async = ngModel.$viewValue;
            }
        }
    }
})();