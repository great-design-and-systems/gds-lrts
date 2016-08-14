(function () {
    'use strict';
    angular.module('gdsApp')
        .service('EventEmitterService', EventEmitterService);
    EventEmitterService.$inject = ['$rootScope'];

    function EventEmitterService($rootScope) {
        return {
            emit: emit,
            onComplete: onComplete,
            onFail: onFail,
            onStart: onStart
        };

        function emit(eventName, data, callback) {
            var localCallback = callback;
            if (data instanceof Function) {
                localCallback = data;
            }
            if (data && !(data instanceof Function)) {
                $rootScope.$broadcast(eventName + '_start', data);
                $rootScope.$broadcast(eventName, data, function (err, resolve) {
                    if (err) {
                        if (localCallback) {
                            localCallback(err);
                        }
                        $rootScope.$emit(eventName + '_fail', err);
                    } else {
                        if (localCallback) {
                            localCallback(undefined, resolve);
                        }
                        $rootScope.$emit(eventName + '_complete', resolve);
                    }
                });
            } else {
                $rootScope.$broadcast(eventName + '_start');
                $rootScope.$broadcast(eventName, function (err, resolve) {
                    if (err) {
                        if (localCallback) {
                            localCallback(err);
                        }
                        $rootScope.$emit(eventName + '_fail', err);
                    } else {
                        if (localCallback) {
                            localCallback(undefined, resolve);
                        }
                        $rootScope.$emit(eventName + '_complete', resolve);
                    }
                });
            }

        }

        function onComplete(eventName, callback) {
            $rootScope.$on(eventName + '_complete', function ($event, resolve) {
                callback(resolve);
            });
        }

        function onFail(eventName, callback) {
            $rootScope.$on(eventName + '_fail', function ($event, resolve) {
                callback(resolve);
            });
        }
        function onStart(eventName, callback) {
            $rootScope.$on(eventName + '_start', function ($event, param) {
                callback(param);
            });
        }
    }
})();