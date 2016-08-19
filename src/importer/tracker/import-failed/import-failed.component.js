(function() {
    'use strict';
    angular.module('app.importer')
        .component('importFailed', {
            templateUrl: 'src/importer/tracker/import-failed/import-failed.html',
            controller: ImportFailedComponent,
            controllerAs: 'importFailed'
        });
    ImportFailedComponent.$inject = ['EventEmitterService', 'ImporterEvents'];

    function ImportFailedComponent(EventEmitterService, ImporterEvents) {
        var importFailed = this;
        importFailed.$onInit = onInit;
        importFailed.shown = true;
        importFailed.getIcon = getIcon;
        EventEmitterService.onComplete(ImporterEvents.GET_FAILED_EVENT, function(imports) {
            importFailed.isLoading = false;
            importFailed.imports = imports;
        });

        function onInit() {
            importFailed.isLoading = true;
            EventEmitterService.emit(ImporterEvents.GET_FAILED_EVENT);
        }

        function getIcon() {
            return 'img/ext/svg/blank-file.svg';
        }
    }
})();