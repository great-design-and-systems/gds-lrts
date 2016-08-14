(function () {
    'use strict';
    angular.module('gdsApp')
        .constant('vendors', {
            jQuery: $,
            Socket: io,
            pace: Pace,
            moment: moment,
            lodash: _,
            Chart: Chart,
            color2color: color2color,
            Canvas2Image: Canvas2Image,
            html2canvas: html2canvas
        });
})();