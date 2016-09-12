(function () {
    'use strict';
    angular.module('app.core')
        .component('toolbarLogo', {
            templateUrl: 'src/app/core/toolbar-logo/toolbar-logo.html',
            controller: ToolbarLogoComponent,
            controllerAs: 'toolbarLogo'
        });
    ToolbarLogoComponent.$inject = ['EventEmitterService', 'LabelsEvents', 'LabelsService'];
    function ToolbarLogoComponent(EventEmitterService, LabelsEvents, LabelsService) {
        var toolbarLogo = this;
        toolbarLogo.title = LabelsService.values.label_title_name;
        toolbarLogo.branch = LabelsService.values.label_title_branch;

        EventEmitterService.onComplete(LabelsEvents.CASCADE_LABELS, function (result) {
            toolbarLogo.isLoading = false;
            if (result) {
                toolbarLogo.title = result['label_title_name'];
                toolbarLogo.branch = result['label_title_branch'];
            }
        });
    }
})();