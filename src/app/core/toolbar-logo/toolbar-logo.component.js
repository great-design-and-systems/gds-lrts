(function () {
    'use strict';
    angular.module('app.core')
        .component('toolbarLogo', {
            templateUrl: 'src/app/core/toolbar-logo/toolbar-logo.html',
            controller: ToolbarLogoComponent,
            controllerAs: 'toolbarLogo'
        });
    ToolbarLogoComponent.$inject = ['SchoolResourceService'];
    function ToolbarLogoComponent(SchoolResourceService) {
        var toolbarLogo = this;
        toolbarLogo.$onInit = onInit;

        function onInit() {
            return SchoolResourceService.getSchool(function (err, school) {
                if (!err) {
                    toolbarLogo.schoolName = school.name;
                }
            }).$promise;
        }
    }
})();