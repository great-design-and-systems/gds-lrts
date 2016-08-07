(function () {
    'use strict';
    angular.module('app.school')
        .component('schoolLink', {
            templateUrl: 'src/school/link/school-link.html',
            controller: SchoolLinkComponent,
            controllerAs: 'schoolLink'
        });
    function SchoolLinkComponent() {
        var schoolLink = this;
    }
})();