(function () {
    'use strict';
    angular.module('app.core')
        .component('mainFrame', {
            template: '<div class="main-div" ui-view="mainFrame"></div>'
        });
})();