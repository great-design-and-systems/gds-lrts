(function () {
    'use strict';
    angular.module('gdsApp')
        .constant('vendors', {
            jQuery: $,
            Socket: io,
            pace: Pace,
            moment: moment,
            lodash: _
        });
})();