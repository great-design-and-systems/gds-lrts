(function() {
    'use strict';
    angular.module('app.importer')
        .component('importCompleted', {
            templateUrl: 'src/importer/tracker/import-completed/import-completed.html',
            controller: ImportCompletedComponent,
            controllerAs: 'importCompleted'
        });
    ImportCompletedComponent.$inject = ['EventEmitterService', 'ImporterEvents', '$mdDialog'];

    function ImportCompletedComponent(EventEmitterService, ImporterEvents, $mdDialog) {
        var importCompleted = this;
        importCompleted.$onInit = onInit;
        importCompleted.shown = true;
        importCompleted.getIcon = getIcon;
        EventEmitterService.onComplete(ImporterEvents.GET_COMPLETED_EVENT, function(imports) {
            importCompleted.isLoading = false;
            importCompleted.imports = imports;
        });

        function onInit() {
            importCompleted.isLoading = true;
            EventEmitterService.emit(ImporterEvents.GET_COMPLETED_EVENT);
        }

        function getIcon(importCompleted) {
            var icon = 'img/ext/svg/csv-file-format-symbol.svg';
            if (importCompleted.type === 'pdf_importer') {
                icon = 'img/ext/svg/pdf-file-format-symbol.svg';
            }
            return icon;
        }

    }
})();