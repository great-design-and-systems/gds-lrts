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
        function emit(eventName, callback) {
            $rootScope.$broadcast(eventName, function (err, resolve) {
                if (err) {
                    if (callback) {
                        callback(err);
                    }
                } else {
                    if (callback) {
                        callback(undefined, resolve);
                    }
                    $rootScope.$broadcast(eventName + '_complete', resolve);
                }
            });
        }

        function onComplete(eventName, callback) {
            $rootScope.$on(eventName + '_complete', function ($event, resolve) {
                callback(resolve);
            });
        }
    }
})();