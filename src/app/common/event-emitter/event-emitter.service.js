(function () {
    'use strict';
    angular.module('gdsApp')
        .service('EventEmitterService', EventEmitterService);
    EventEmitterService.$inject = ['$rootScope'];
    function EventEmitterService($rootScope) {
        return {
            emit: emit,
            onComplete: onComplete
        };
        function emit(eventName, data, callback) {
            var localCallback = callback;
            if (data instanceof Function) {
                localCallback = data;
            }
            if (data && !data instanceof Function) {
                $rootScope.$broadcast(eventName, data, function (err, resolve) {
                    if (err) {
                        if (localCallback) {
                            localCallback(err);
                        }
                    } else {
                        if (localCallback) {
                            localCallback(undefined, resolve);
                        }
                        $rootScope.$broadcast(eventName + '_complete', resolve);
                    }
                });
            } else {
                $rootScope.$broadcast(eventName, function (err, resolve) {
                    if (err) {
                        if (localCallback) {
                            localCallback(err);
                        }
                    } else {
                        if (localCallback) {
                            localCallback(undefined, resolve);
                        }
                        $rootScope.$broadcast(eventName + '_complete', resolve);
                    }
                });
            }

        }

        function onComplete(eventName, callback) {
            $rootScope.$on(eventName + '_complete', function ($event, resolve) {
                callback(resolve);
            });
        }
    }
})();