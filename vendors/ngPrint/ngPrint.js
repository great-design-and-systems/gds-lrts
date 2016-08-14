(function (angular, html2canvas, jQuery, Canvas2Image) {
    'use strict';

    var mod = angular.module('ngPrint', []);

    function printDirective() {
        var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }

        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = jQuery('#' + attrs.printElementId);
                html2canvas(elemToPrint, {
                    onrendered: function (canvas) {
                        var height = jQuery(canvas).attr('height');
                        var width = jQuery(canvas).attr('width');
                        var image = Canvas2Image.convertToPNG(canvas, width, height);
                        printElement(image);
                    }
                });
            });

            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            };
        }

        function printElement(elem) {
            // clones the element you want to print
            printSection.innerHTML = '';
            printSection.appendChild(elem);
            window.print();
        }

        return {
            link: link,
            restrict: 'A'
        };
    }

    mod.directive('ngPrint', [printDirective]);
} (window.angular, window.html2canvas, window.$, window.Canvas2Image));
